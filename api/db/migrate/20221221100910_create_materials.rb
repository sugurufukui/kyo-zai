class CreateMaterials < ActiveRecord::Migration[6.1]
  def change
    create_table :materials do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string 'image'
      t.timestamps
    end
  end
end
