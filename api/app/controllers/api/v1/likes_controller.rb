class Api::V1::LikesController < ApplicationController
  def show
    return unless current_api_v1_user

    @material = Material.find(params[:material_id])
    @like = current_api_v1_user.likes.find_by(material_id: @material.id)
    @like_count = Like.where(material_id: @material.id)
    @like_count = @like_count.length

    render json: { like: @like, like_count: @like_count }
  end

  def create
    if current_api_v1_user
      @material = Material.find(params[:material_id])
      @like = Like.create(like_params)

      if @like.save
        render json: {
          status: :created,
          like: @like
        }
      else
        render json: { status: 500, like: @like.errors }
      end

    else
      render json: {
        status: 500,
        errors: ["LIKEできませんでした"]
      }
    end
  end

  def destroy
    @user = current_api_v1_user
    @material = Material.find(params[:material_id])
    @like = Like.find_by(material_id: @material.id, user_id: @user.id)

    @like.destroy
    render json: {
      status: :delete
    }
  end

  private

  def like_params
    params.permit(:material_id, :user_id)
  end
end
