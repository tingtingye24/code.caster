Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/questions', to: 'questions#index'
  get '/questions/:id', to: 'questions#show'

  get '/users', to: 'users#index'
  get '/users/topTen', to: 'users#topTen'
  post '/users', to: 'users#create'
end
