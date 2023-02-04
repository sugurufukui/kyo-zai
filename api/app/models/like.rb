 class Like < ApplicationRecord
  belongs_to :user
  belongs_to :material

  # 1人が１つの投稿に対して、１つしかいいねをつけられないようにする
  validates_uniqueness_of :material_id, scope: :user_id
end
