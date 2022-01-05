class Api::OrgsController < ApplicationController
  def get
    user_with_token = User.where(access_token: params[:access_token])
    if user_with_token.blank?
      render json: { error: "No user with given token" }, status: :not_found
    else
      user = user_with_token[0]
      user_orgs = user.organizations
      render json: { organizations: user_orgs }, status: :ok
    end
  end
end