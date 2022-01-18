class Api::OrgsController < ApplicationController
  def index
    render json: { organizations: @user.organizations }, status: :ok
  end
end