class Api::V1::UsersController < ApplicationController
  # ログイン中のユーザーが投稿したmaterialに紐づくデータを取得
  def show
    render json: Material.where(user_id: params[:id])
  end
end
