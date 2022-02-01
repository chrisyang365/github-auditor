class Api::OrgsController < ApplicationController
  def index
    render json: @user.organizations, status: :ok
  end
end