class CreateGuest < ActiveRecord::Migration[7.0]
  def change
    create_table :guests do |t|
      t.string "name", limit: 191
      t.integer "points", null: false, default: 0
      t.timestamps
    end
  end
end
