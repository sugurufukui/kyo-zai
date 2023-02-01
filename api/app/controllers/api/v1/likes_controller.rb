class Api::V1::LikesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: ['create']

  def create
      like = Like.new(material_id: params[:id], user_id: current_api_v1_user.id)

      if like.save
          render json: like
      else
          render json: like.errors, status: 422
      end
  end

  def destroy
      like = Like.find_by(material_id: params[:id], user_id: current_api_v1_user.id)
      if like.destroy
          render json: like
      else
          render json: like.errors, status: 422
      end
  end
end
