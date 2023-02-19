class Material < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  # file_uploader.rbに紐づける
  mount_uploader :image, ImageUploader
  # 数値が[0] 未満にならないようにするvalidationを用意
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true
  validates :likes, length: { minimum: 0 }
  validates :user_id, presence: true
end
