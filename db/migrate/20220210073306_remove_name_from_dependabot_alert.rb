class RemoveNameFromDependabotAlert < ActiveRecord::Migration[6.1]
  def change
    remove_column :dependabot_alerts, :name, :string
  end
end
