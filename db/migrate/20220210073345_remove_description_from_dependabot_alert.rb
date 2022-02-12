class RemoveDescriptionFromDependabotAlert < ActiveRecord::Migration[6.1]
  def change
    remove_column :dependabot_alerts, :description, :string
  end
end
