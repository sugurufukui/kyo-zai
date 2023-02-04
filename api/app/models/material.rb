class Material < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  # 数値が[0] 未満にならないようにするvalidationを用意
  validates :likes, length: { minimum: 0 }
end
