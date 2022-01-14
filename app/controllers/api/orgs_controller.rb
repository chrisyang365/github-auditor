class Api::OrgsController < ApplicationController
  def get
    render json: { organizations: @user.organizations }, status: :ok
  end
end