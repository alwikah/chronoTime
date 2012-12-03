class CreateItems < ActiveRecord::Migration
  def up
    create_table :items do |t|
      t.string :label
      t.integer :time
      t.string :payment_type
      t.float :payment_unit

      t.timestamps
    end
  end

  def down
    drop_table :items
  end
end
