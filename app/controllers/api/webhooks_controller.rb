class Api::WebhooksController < ApplicationController
  skip_before_action :authorized
  before_action :verify_sender

  def create
    if request.headers['X-GitHub-Event'] == 'repository_vulnerability_alert'
      action = params['webhook']['action']
      alert = params['alert']
      node_id = alert['node_id']
      severity = alert['severity'].upcase
      repo_name = params['repository']['full_name']
      repo = Repository.find_by(name: repo_name)
      if action == 'create'
        new_dependabot_alert = DependabotAlert.create(node_id: node_id, severity: severity, repository: repo)
        render json: { message: 'Successfully received CREATE webhook payload from Github', dependabot_alert: new_dependabot_alert }, status: :created
      else
        dependabot_alert = DependabotAlert.find_by(node_id: node_id)
        dependabot_alert.destroy
        render json: { message: "Successfully received #{action.upcase} webhook payload from Github", dependabot_alert: dependabot_alert}, status: :created
      end
    else
      render json: { message: 'Generic success message for receiving webhook payload. WILL REPLACE LATER' }, status: :created
    end
  end

  private
  def verify_sender
    headers = request.headers
    if !headers.key?('X-GitHub-Delivery') || !headers.key?('X-GitHub-Event')
      render json: { message: 'unauthorized' }, status: :unauthorized
    end
  end
end