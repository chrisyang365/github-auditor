class Api::ReposController < ApplicationController
    before_action :get_orgs
    def index
      render json: { repositories: @organization.repositories}, status: :ok
    end

    private
    def get_orgs
        @organization = @user.organizations.where(name: params[:org_id]).first
    end
end
  