class AddColumnsToMaterials < ActiveRecord::Migration[6.1]
  def change
    # add_column :materials, :image, :string, null: false, content: "教材の画像", after: :description
    add_reference :materials, :user, foreign_key: true, after: :description
  end
end
