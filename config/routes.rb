Rails.application.routes.draw do
  root 'homepage#index'
  #api endpoints here
  namespace :api do
    resources 'auth', only: [:create]
    get 'organizations/:access_token', to: 'auth#organizations'
  end
  get '*path', to: 'homepage#index'
end
