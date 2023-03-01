# ログイン状態確認用コントローラー
class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user

      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end

  # ゲストユーザーでログイン
  def guest_sign_in
    @resource = User.guest
    @token = @resource.create_token
    @resource.save!
    render_create_success
  end

  def render_create_success
    render json: {
      data: resource_data(resource_json: @resource.token_validation_response)
    }
  end

  def resource_data(opts = {})
    response_data = opts[:resource_json] || @resource.as_json
    response_data['type'] = @resource.class.name.parameterize if json_api?
    response_data
  end

  def token_validation_response
    as_json(except: %i[tokens created_at updated_at])
  end

  class User < ApplicationRecord
    # ゲストユーザーが存在しない場合、ゲストユーザーを作成

    # guest@example.comに対して新規作成・削除や編集などの制限をかける必要あり
    def self.guest
      # find_or_create_by!にすることで、ゲストユーザーを削除されてゲスト機能が動作しなくなるリスクを回避
      find_or_create_by!(email: "guest@example.com") do |user|
        # SecureRandomにすることでメールアドレスパスワードの変更防止
        user.password = SecureRandom.urlsafe_base64
        user.name = "ゲストユーザー"
      end
    end
  end

  private

  def login_params
    params.permit(:session)
  end
end
