class CreateMaterials < ActiveRecord::Migration[6.1]
  def change
    create_table :materials do |t|
      t.string :name, null: false, content: "教材の名前"
      t.text :description, null: false, content: "教材の説明文"
      t.timestamps
    end
  end
end
