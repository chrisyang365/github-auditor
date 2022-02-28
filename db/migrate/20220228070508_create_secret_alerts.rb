class CreateSecretAlerts < ActiveRecord::Migration[6.1]
  def change
    create_table :secret_alerts do |t|
      t.integer :alert_number
      t.references :repository, null: false, foreign_key: true

      t.timestamps
    end
  end
end
