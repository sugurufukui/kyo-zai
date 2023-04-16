class AddColumnsToMaterials < ActiveRecord::Migration[6.1]
  def change
    add_reference :materials, :user, foreign_key: true, after: :description
  end
end
