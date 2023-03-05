class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    # @user = User.find_by(id: params[:id])

    if current_api_v1_user.id == @user.id && @user.email != "guest@example.com"
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: { message: "データを更新できませんでした" }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:name, :email, :image)
  end
end
