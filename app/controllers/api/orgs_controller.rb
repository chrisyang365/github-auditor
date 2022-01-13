class Api::OrgsController < ApplicationController
  before_action :authenticate
  
  def get
    render json: { organizations: @user.organizations }, status: :ok
  end

  private
  def authenticate
    authenticate_token || render_unauthorized
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      @user = User.find_by(access_token: token)
    end
  end

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Token realm="Application"'
    render json: 'Bad credentials', status: :unauthorized
  end
end