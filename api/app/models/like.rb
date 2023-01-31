class Like < ApplicationRecord
  belongs_to :user
  belongs_to :material

  validate_uniqueness_of :material_id, scope: :user_id
end
