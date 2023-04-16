class AddIntroductionToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :introduction, :string, default: "よろしくお願いします！", after: :email
  end
end
