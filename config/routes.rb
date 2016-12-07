Rails.application.routes.draw do
  resources :datasources, controller: 'databases'
  #get 'datasources', to: 'databases#index'
  #post 'datasources', to: 'databases#create'
  #get 'datasource', to: 'databases#show'
  #patch 'datasource', to: 'databases#update'
  #put 'datasource', to: 'databases#update'
  #delete 'datasource', to: 'databases#destroy'
end
