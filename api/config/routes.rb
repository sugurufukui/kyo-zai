Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :materials
      resources :users

      mount_devise_token_auth_for 'User', at: 'auth',
        controllers: {
          registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      # ゲストログイン機能
      devise_scope :v1_user do
        post "auth/guest_sign_in", to: "auth/sessions#guest_sign_in/"
      end
    end
  end
end
