Rails.application.routes.draw do
  resources :datasources, controller: 'databases'
  resources :jobs, controller: 'jobs'

  Rails.application.routes.draw do
    mount_ember_app :frontend, to: "/"

    get '/workflows/:id' => 'workflows#show'
  end
end
