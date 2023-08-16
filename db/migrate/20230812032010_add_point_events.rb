class AddPointEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :point_events do |t|
      t.belongs_to :guest, null: false, foreign_key: true
      t.integer "points", null: false, default: 0
      t.timestamps
    end
  end
end
