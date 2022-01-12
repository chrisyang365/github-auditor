class Api::OrgsController < ApplicationController
  before_action :authenticate
  
  def get
    render json: { organizations: @user.organizations }, status: :ok
  end

  private
  def authenticate
    authenticate_or_request_with_http_token do |token, options|
      @user = User.find_by(access_token: token)
    end
  end
end