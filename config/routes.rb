require 'resque/server'

Rails.application.routes.draw do
  root 'homepage#index'
  #api endpoints here
  namespace :api do
    resources 'auth', only: [:create]
    resources 'orgs', only: [:index] do
      resources 'repos', only: [:index] do
        get 'dependabotalerts', to: 'dependabot_alert#get'
        get 'codealerts', to: 'code_alerts#get'
      end
    end
    resources 'webhooks', only: [:create]
  end
  #Resque server here
  mount Resque::Server.new, at: '/jobs'
  #Frontend entry point here
  get '*path', to: 'homepage#index'
end
