Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :materials do
        resource :likes, only: %i[show create destroy]
      end

      # 自分が投稿した教材
      get "/my_materials", to: "materials#my_materials", as:
      :my_materials

      # 自分がいいねした教材
      get "/my_like", to: "materials#my_like_materials", as: :my_like_materials

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      devise_scope :api_v1_user do
        # ゲストログイン機能
        post 'auth/guest_sign_in', to: 'auth/sessions#guest_sign_in'
        get 'auth/sessions', to: 'auth/sessions#index'
      end
    end
  end
end
