Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :materials do
        resource :likes, only: %i[show create destroy]
      end

      get "/my_materials", to: "materials#my_materials", as: :my_materials
      get "/my_like", to: "materials#my_like_materials", as: :my_like_materials

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        passwords: 'api/v1/auth/passwords',
        confirmations: 'api/v1/auth/confirmations'
      }

      devise_scope :api_v1_user do
        post 'auth/guest_sign_in', to: 'auth/sessions#guest_sign_in'
        get 'auth/sessions', to: 'auth/sessions#index'
        post 'auth/passwords', to: 'auth/passwords#create'
        put 'auth/passwords', to: 'auth/passwords#update'
      end

      # アカウント削除確認メール送信
      post '/users/:user_id/send_deletion_confirmation_email', to: 'users#send_deletion_confirmation_email'
    end
  end

  get '/health_check', to: 'health_checks#index'
end
