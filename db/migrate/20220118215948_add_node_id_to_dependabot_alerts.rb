class AddNodeIdToDependabotAlerts < ActiveRecord::Migration[6.1]
  def change
    add_column :dependabot_alerts, :node_id, :string
  end
end
