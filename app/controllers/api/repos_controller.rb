class Api::ReposController < ApplicationController
    before_action :get_orgs, :check_org
    def index      
      @repos = @organization.repositories

      render json: @repos, include: [:code_alerts, :dependabot_alerts, :secret_alerts], status: :ok
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
  