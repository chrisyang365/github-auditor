class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :authorized

  def auth_header
    request.headers['Authorization']
  end

  def current_user
    token = auth_header.split(' ')[1]
    if token
      @user = User.find_by(access_token: token)
    else
      nil
    end
  end

  def logged_in?
    !!current_user
  end

  def authorized
    render json: { message: 'Bad credentials' }, status: :unauthorized unless logged_in?
  end
end
