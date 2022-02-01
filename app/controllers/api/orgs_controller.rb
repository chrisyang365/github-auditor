class Api::OrgsController < ApplicationController
  def index
    render json: @user.organizations.order("name"), status: :ok
  end
end