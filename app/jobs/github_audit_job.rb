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

    @user = User.create(access_token: access_token, login: login, name: name)

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

        if !org_json['two_factor_requirement_enabled'].nil?
          new_org = Organization.create(name: org_name, avatar_url: org_json['avatar_url'], two_factor_requirement_enabled: org_json['two_factor_requirement_enabled'])
          user_orgs.append(new_org)
        end
      else
        user_orgs.append(Organization.find(name: org_name))
      end
    end
    @user.organizations = user_orgs
    @user.save!
  end
end
