Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/ranking', to: 'ranking#index'

  resources :guests, only: [:index, :create, :new, :destroy]
end
