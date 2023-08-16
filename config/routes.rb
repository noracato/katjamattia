Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "welcome#index"

  get '/ranking', to: 'ranking#index'
  get '/ranking/live', to: 'ranking#live'

  resources :guests, only: [:index, :create, :new, :destroy]

  resources :guests do
    get :points, on: :collection

    member do
      post :add_points
    end
  end

  resources :messages, only: [:index, :create]
  resources :messages do
    get :live, on: :collection
  end
end
