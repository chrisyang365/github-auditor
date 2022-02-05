class Api::ReposController < ApplicationController
    before_action :get_orgs, :check_org
    def index      
      repos = @organization.repositories
      repos_json = JSON.parse(repos.to_json())

      # add code_alerts_exist flag to repositories json
      repos.zip(repos_json).each { |repo, repo_json|
        repo_json["code_alerts_exist"] |= (repo.code_alerts.size() > 0)
      }

      render json: { repositories: repos_json }, status: :ok
    end

    private
    def get_orgs
        @organization = @user.organizations.where(name: params[:org_id]).first
    end

    def check_org
      if !@organization
        render json: { message: 'No organizations were found' }, status: :not_found
      end
    end
end
  