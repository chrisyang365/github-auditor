class RemoveStatusFromDependabotAlert < ActiveRecord::Migration[6.1]
  def change
    remove_column :dependabot_alerts, :status, :string
  end
end
