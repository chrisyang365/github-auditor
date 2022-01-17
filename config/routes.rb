require 'resque/server'

Rails.application.routes.draw do
  root 'homepage#index'
  #api endpoints here
  namespace :api do
    resources 'auth', only: [:create]
    get 'organizations', to: 'orgs#get'
  end
  #Resque server here
  mount Resque::Server.new, at: '/jobs'
  #Frontend entry point here
  get '*path', to: 'homepage#index'
end
