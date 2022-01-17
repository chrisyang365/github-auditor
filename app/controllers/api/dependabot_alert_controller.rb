class Api::DependabotAlertController < ApplicationController
  before_action :validate_params

  def get
    render json: { dependabot_alerts: @repository.dependabot_alerts }, status: :ok
  end

  # checks if repo and org are null, user has organizations,
  # org with org_id is in the user's organizations, and
  # repository has same org_id as organization
  #
  # last line checks for ORG_ID NOT NAME,
  def check_org_and_repo?
    @repository = Repository.find_by(name: params[:repo_id])
    @organization = Organization.find_by(name: params[:org_id])

    !(@repository.nil? || 
      @organization.nil? || 
      @user.organizations.nil? ||
      !@user.organizations.include?(@organization) ||
      !@repository['organization_id'] == @organization['id'])
  end

  def validate_params
    render json: { message: 'Bad parameters' }, status: :unauthorized unless check_org_and_repo?
  end
end