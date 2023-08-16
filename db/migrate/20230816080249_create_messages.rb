class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string  :name,    limit: 191
      t.text    :message, limit: 8192
      t.timestamps
    end
  end
end
