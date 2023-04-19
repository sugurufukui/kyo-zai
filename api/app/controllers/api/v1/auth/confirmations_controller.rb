class Api::V1::Auth::ConfirmationsController < DeviseTokenAuth::ConfirmationsController
  # メールアドレスの確認リンクをクリックした後の処理
  def show
    # confirmation_token でユーザが見つかることを確認
    @resource = resource_class.confirm_by_token(resource_params[:confirmation_token])

    if @resource.errors.empty? && @resource.confirmed?
      # メールアドレスが正常に確認された場合
      redirect_to Rails.application.config.confirm_success_url
    else
    # 期限切れの場合は "/expired_email_link" を表示
      redirect_to Rails.application.config.expired_email_link_url
    end
  end

  protected

  def resource_params
    params.permit(:config, :confirmation_token, :redirect_url)
  end
end
