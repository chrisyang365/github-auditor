class CreateCodeAlerts < ActiveRecord::Migration[6.1]
  def change
    create_table :code_alerts do |t|
      t.string :name
      t.text :description
      t.string :severity
      t.string :status
      t.references :repository, null: false, foreign_key: true

      t.timestamps
    end
  end
end
