class Api::V1::MaterialsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[my_like_materials my_materials create update destroy]

  def index
    render json: Material.all.order(created_at: :desc)
  end

  def my_materials
    @user = current_api_v1_user
    @my_materials = Material.where(user_id: @user.id)
    render json: @my_materials.order(created_at: :desc)
  end

  def my_like_materials
    @user = current_api_v1_user
    @my_like_materials = Like.where(user_id: @user.id).order(created_at: :desc)
    @my_like_materials = @my_like_materials.map { |m| Material.find_by(id: m.material_id) }
    render json: @my_like_materials
  end

  def show
    @material = Material.find(params[:id])
    render json: @material.as_json(include: { user: { only: [:id, :name] } })
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
