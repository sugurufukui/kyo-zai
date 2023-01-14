# アカウント作成用コントローラー
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  # before_action :ensure_normal_user, %i[update destroy]
  # def ensure_normal_user
  #   if resource.email == 'guest@example.com'
  #     redirect_to root_path, alert: 'ゲストユーザーは更新・削除はできません。'
  #   end
  # end

  private

    def sign_up_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
end
