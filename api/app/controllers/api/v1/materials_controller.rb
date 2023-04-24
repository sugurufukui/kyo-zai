class Api::V1::MaterialsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[liked_materials mine_materials create update destroy]

  def index
    render json: Material.all.order(created_at: :desc)
  end

  def mine_materials
    @user = current_api_v1_user
    @mine_materials = Material.where(user_id: @user.id)
    render json: @mine_materials.order(created_at: :desc)
  end

  def liked_materials
    @user = current_api_v1_user
    @liked_materials = Like.where(user_id: @user.id).order(created_at: :desc)
    @liked_materials = @liked_materials.map { |m| Material.find_by(id: m.material_id) }
    render json: @liked_materials
  end

  def show
    @material = Material.find(params[:id])
    render json: @material.as_json(include: { user: { only: %i[id name] } })
  end

  def create
    material = Material.new(material_params)
    if material.save
      render json: material
    else
      render json: material.errors, status: :unprocessable_entity
    end
  end

  def update
    material = Material.find(params[:id])
    if current_api_v1_user.id == material.user_id
      if material.update(material_params)
        render json: material
      else
        render json: material.errors, status: :unprocessable_entity
      end
    else
      render json: { message: "データを更新できませんでした" }, status: :unprocessable_entity
    end
  end

  def destroy
    material = Material.find(params[:id])
    if current_api_v1_user.id == material.user_id
      material.destroy
      render json: material
    else
      render json: { message: "データを削除できませんでした" }, status: :unprocessable_entity
    end
  end

  private

  def material_params
    params.permit(:name, :description, :image).merge(user_id: current_api_v1_user.id)
  end
end
