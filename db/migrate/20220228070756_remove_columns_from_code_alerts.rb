class RemoveColumnsFromCodeAlerts < ActiveRecord::Migration[6.1]
  def change
    remove_columns :code_alerts, :name, :description, :status, :severity
  end
end
