class GithubAuditJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Get all organizations that user belongs to
    access_token = args[0]
    orgs_uri = URI.parse('https://api.github.com/user/orgs')
    orgs_req = Net::HTTP::Get.new(orgs_uri)
    orgs_req['Authorization'] = 'token ' + access_token
    orgs_res = Net::HTTP.start(orgs_uri.hostname, orgs_uri.port, :use_ssl => orgs_uri.scheme == 'https') do |http|
      http.request(orgs_req)
    end
    orgs_json = JSON.parse(orgs_res.body)

    org_names = []
    login = args[1]
    name = args[2]

    @user = User.new(access_token: access_token, login: login, name: name)

    orgs_json.each do |org|
      org_names.append(org['login'])
    end

    user_orgs = []
    #Get all existing organizations in database that already exist in database
    existing_orgs = Set.new(Organization.where(name: org_names).pluck(:name))
    org_names.each do |org_name|
      #Only create the organizations that do not already exist in the database
      if !existing_orgs.include? org_name
        org_uri = URI.parse('https://api.github.com/orgs/' + org_name)
        org_req = Net::HTTP::Get.new(org_uri)
        org_req['Authorization'] = 'token ' + access_token
        org_res = Net::HTTP.start(org_uri.hostname, org_uri.port, :use_ssl => org_uri.scheme == 'https') do |http|
          http.request(org_req)
        end
        org_json = JSON.parse(org_res.body)

        #We can only audit orgs that loggged in user is an admin for
        if !org_json['two_factor_requirement_enabled'].nil?
          new_org = Organization.create(name: org_name, avatar_url: org_json['avatar_url'], two_factor_requirement_enabled: org_json['two_factor_requirement_enabled'], billing_plan: org_json['plan']['name'])
          user_orgs.append(new_org)

          #Get all the repos under each org
          repos_uri = URI.parse('https://api.github.com/orgs/' + org_name + '/repos')
          repos_req = Net::HTTP::Get.new(repos_uri)
          repos_req['Authorization'] = 'token ' + access_token
          repos_res = Net::HTTP.start(repos_uri.hostname, repos_uri.port, :use_ssl => repos_uri.scheme == 'https') do |http|
            http.request(repos_req)
          end
          repos_json = JSON.parse(repos_res.body)

          repos_json.each do |repo|
            new_repo = Repository.create(name: repo['full_name'], organization: new_org)

            # Retrieve Dependabot Alerts via GraphQL API
            query = <<-GRAPHQL
            query {
                repository(name: "#{repo['name']}", owner: "#{org_name}") {
                    vulnerabilityAlerts(first: 100) {
                        nodes {
                            id
                            dismissedAt
                            securityVulnerability {
                                severity
                            }
                        }
                      pageInfo {
                        endCursor
                        hasNextPage
                      }
                    }
                }
            }
            GRAPHQL
            graphql_uri = URI("https://api.github.com/graphql")
            graphql_res = Net::HTTP.start(graphql_uri.host, graphql_uri.port, use_ssl: true) do |http|
                graphql_req = Net::HTTP::Post.new(graphql_uri)
                graphql_req['Content-Type'] = 'application/json'
                graphql_req['Authorization'] = "bearer #{access_token}"
                # The body needs to be a JSON string.
                graphql_req.body = JSON[{'query' => query}]
                http.request(graphql_req)
            end
            dependabot_alerts_json = JSON.parse(graphql_res.body)
            repo_dependabot_alerts = []
            dependabot_alerts_json['data']['repository']['vulnerabilityAlerts']['nodes'].each do |alert|
              if alert['dismisssedAt'].nil?
                DependabotAlert.create(node_id: alert['id'], severity: alert['securityVulnerability']['severity'], repository: new_repo)
              end
            end

            #Retrieve code alerts for each repo
            code_alerts_uri = URI.parse('https://api.github.com/repos/' + repo['full_name'] + '/code-scanning/alerts')
            code_alerts_req = Net::HTTP::Get.new(code_alerts_uri)
            code_alerts_req['Authorization'] = 'token ' + access_token
            code_alerts_res = Net::HTTP.start(code_alerts_uri.hostname, code_alerts_uri.port, :use_ssl => code_alerts_uri.scheme == 'https') do |http|
              http.request(code_alerts_req)
            end

            if code_alerts_res.code == '200'
              code_alerts_json = JSON.parse(code_alerts_res.body)
              code_alerts_json.each do |alert|
                CodeAlert.create(alert_number: alert['number'], repository: new_repo)
              end
            end
          end

          #Enable webhooks for org
          webhooks_uri = URI('https://api.github.com/orgs/' + org_name + '/hooks')
          webhooks_req = Net::HTTP::Post.new(webhooks_uri, 'Content-Type' => 'application/json')
          webhooks_req['Authorization'] = 'token ' + access_token
          webhook_events = ['code_scanning_alert', 'member', 'repository', 'repository_vulnerability_alert', 'secret_scanning_alert']
          webhook_config = { url: 'https://github-auditor.herokuapp.com/api/webhooks', content_type: 'json' }
          webhooks_req.body = { name: 'web', config: webhook_config, events: webhook_events }.to_json
          webhook_res = Net::HTTP.start(webhooks_uri.hostname, webhooks_uri.port, :use_ssl => webhooks_uri.scheme == 'https') do |http|
            http.request(webhooks_req)
          end
        end
      else
        user_orgs.append(Organization.find_by(name: org_name))
      end
    end
    @user.organizations = user_orgs
    @user.save!
  end
end
