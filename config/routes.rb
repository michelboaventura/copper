Rails.application.routes.draw do
  get 'databases' => 'databases#index'
  resource :database
end
