class Api::WebhooksController < ApplicationController
  skip_before_action :authorized
  before_action :verify_sender

  def create
    render json: { message: 'Successfully received webhook payload from GitHub' }, status: :created
  end

  private
  def verify_sender
    headers = request.headers
    if !headers.key?('X-GitHub-Delivery') || !headers.key?('X-GitHub-Event')
      render json: { message: 'unauthorized' }, status: :unauthorized
    end
  end
end