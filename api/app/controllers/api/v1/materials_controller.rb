class Api::V1::MaterialsController < ApplicationController
  # 自分の投稿のみ作成、更新、削除する
  before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]

  def index
    render json: Material.all
  end

  def show
    material = Material.find(params[:id])
    render json: material
  end

  def create
    material = Material.new(material_params)
    if material.save
      render json: material
    else
      render json: material.errors, status: 422
    end
  end

  def update
    material = Material.find(params[:id])
    # current_user.idとmaterial.user_idが一致した場合に更新する条件を追加
    if current_api_v1_user.id == material.user_id
      if material.update(material_params)
        render json: material
      else
        render json: material.errors, status: 422
      end
    else
      render json: {message: "データを更新できませんでした"}, status: 422
    end
  end

  def destroy
    material = Material.find(params[:id])
    # current_user.idとmaterial.user_idが一致した場合に削除する条件を追加
    if current_api_v1_user.id == material.user_id
      material.destroy
      render json: material
    else
      render json: {message: "データを削除できませんでした"}, status: 422
    end
  end

    private

    # 新規作成する時にuser_idを一緒に保存できるように、ストロングパラメータに.merge(user_id: current_api_v1_user.id)を追加
    def material_params
      params.require(:material).permit(:name, :description, :image).merge(user_id: current_api_v1_user.id)
    end
end
