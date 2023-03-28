class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  mount_uploader :image, ImageUploader
  has_many :materials, dependent: :destroy
  has_many :likes, dependent: :destroy

  before_save { self.email = email.downcase }
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true
  # 数値が[0] 未満にならないようにするvalidationを用意
  validates :likes, length: { minimum: 0 }

  # ゲストログイン
  # ゲストユーザーが存在しない場合、ゲストユーザーを作成
  # guest@example.comに対して新規作成・削除や編集などの制限をかける必要あり
  def self.guest
    # find_or_create_by!にすることで、ゲストユーザーを削除されてゲスト機能が動作しなくなるリスクを回避
    find_or_create_by!(email: "guest@example.com") do |user|
      # SecureRandomにすることでメールアドレスパスワードの変更防止
      user.password = SecureRandom.urlsafe_base64(10)
      user.name = "ゲストユーザー"
      # user.comment = "ゲストユーザーとしてログイン中"
      user.confirmed_at = Time.now
    end
  end
end
