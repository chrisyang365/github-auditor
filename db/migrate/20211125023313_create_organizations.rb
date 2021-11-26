class CreateOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :avatar_url
      t.boolean :two_factor_requirement_enabled

      t.timestamps
    end
  end
end
