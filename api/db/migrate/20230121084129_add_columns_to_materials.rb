class AddColumnsToMaterials < ActiveRecord::Migration[6.1]
  def change
    add_column :materials, :image, :string, null: false, content: "教材の説明文", after: :description
    add_reference :materials, :user, foreign_key: true, after: :image
  end
end
