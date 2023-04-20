class Api::V1::UsersController < ApplicationController
  GUEST_EMAIL = "guest@example.com"
  ADMIN_EMAIL = ENV.fetch('ADMIN_EMAIL', nil)

  # before_action :authenticate_api_v1_user!, only: [:index]

  def index
    @users = User.all
    if current_api_v1_user&.email == ADMIN_EMAIL
      render json: @users
    else
      render(json: { error: 'Access denied' }, status: :forbidden)
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    if current_api_v1_user.id == @user.id && @user.email != GUEST_EMAIL
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: { message: "データを更新できませんでした" }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    if current_api_v1_user.id == @user.id && @user.email != GUEST_EMAIL
      @user.destroy
      render json: { message: "ユーザーを削除しました" }, status: :ok
    else
      render json: { message: "ユーザーを削除できませんでした" }, status: :unprocessable_entity
    end
  end

  def send_deletion_confirmation_email
    @user = User.find(params[:user_id])
    UserMailer.account_deletion_confirmation(@user).deliver_later
    render json: { message: 'アカウント削除確認メールを送信しました。' }, status: :ok
  end

  private

  def user_params
    params.permit(:name, :email, :introduction, :image)
  end
end
