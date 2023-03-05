class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  mount_uploader :image, ImageUploader
  has_many :materials, dependent: :destroy
  has_many :likes, dependent: :destroy

  # 数値が[0] 未満にならないようにするvalidationを用意
  validates :likes, length: { minimum: 0 }
end
