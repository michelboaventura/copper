Rails.application.routes.draw do
  resources :datasources
  resources :jobs
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  resources :users

  get '/json/:job_id/:visualization', to: 'json#index'

  Rails.application.routes.draw do
    mount_ember_app :frontend, to: "/"
  end
end
