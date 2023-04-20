class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  # パスワード再設定用のトークンを検証し、リダイレクト先のURLを生成
  def edit
    redirect_url = Rails.application.config.reset_password_url
    expired_token_url = Rails.application.config.expired_email_link_url

    # reset_password_token でユーザが見つかることを確認
    @resource = resource_class.with_reset_password_token(resource_params[:reset_password_token])

    # 期限切れの場合は "/expired_email_link" を表示
    if @resource && @resource.reset_password_period_valid?
      url = "#{redirect_url}/#{resource_params[:reset_password_token]}"
      redirect_to url
    else
      redirect_to expired_token_url
    end
  end

  # パスワード再設定用のメールを送信する機能を提供
  def create
    redirect_url = Rails.application.config.reset_password_url

    resource = resource_class.send_reset_password_instructions(create_password_params.merge(redirect_url: redirect_url))

    if successfully_sent?(resource)
      render json: { success: true, message: "パスワード再設定用のメールを送信しました。" }, status: :ok
    else
      render json: { success: false, message: "メールアドレスが見つかりませんでした。" }, status: :not_found
    end
  end

  # トークンでユーザーを検索し、パスワードを更新
  def update
    @resource = resource_class.with_reset_password_token(resource_params[:reset_password_token])

    if @resource && @resource.reset_password_period_valid?
      # トークンが有効であればパスワードを更新
      @resource.update(password: resource_params[:password], password_confirmation: resource_params[:password_confirmation])

      if @resource.errors.empty?
        render json: { success: true, message: "パスワードが正常にリセットされました。" }, status: :ok
      else
        render json: { success: false, errors: @resource.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { success: false, message: "リンクが無効です。" }, status: :unprocessable_entity
    end
  end

  protected

  def validate_redirect_url_param
    true
  end

  def resource_params
    params.permit(:reset_password_token, :config, :password, :password_confirmation)
  end

  def create_password_params
    params.permit(:email)
  end
end
