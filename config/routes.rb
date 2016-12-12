Rails.application.routes.draw do
  resources :datasources, controller: 'databases'
  resources :jobs, controller: 'jobs'
end
