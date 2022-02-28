class AddBillingPlanToOrganizations < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :billing_plan, :string
  end
end
