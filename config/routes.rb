require 'resque/server'

Rails.application.routes.draw do
  root 'homepage#index'
  #api endpoints here
  namespace :api do
    resources 'auth', only: [:create]
    get 'orgs', to: 'orgs#get'
    get 'orgs/:org_id/repos/:repo_id/dependabotalerts', to: 'dependabot_alert#get'
  end
  #Resque server here
  mount Resque::Server.new, at: '/jobs'
  #Frontend entry point here
  get '*path', to: 'homepage#index'
end
