class AddImageToMaterials < ActiveRecord::Migration[6.1]
  def change
    add_column :materials, :image, :string, null: false, content: "教材の説明文"
  end
end
