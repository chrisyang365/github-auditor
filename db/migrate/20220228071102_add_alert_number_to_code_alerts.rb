class AddAlertNumberToCodeAlerts < ActiveRecord::Migration[6.1]
  def change
    add_column :code_alerts, :alert_number, :integer
  end
end
