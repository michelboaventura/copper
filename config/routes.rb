Rails.application.routes.draw do
  get 'datasources' => 'datasources#index'
  resource :datasource
end
