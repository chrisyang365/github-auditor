class CreateUserOrgTables < ActiveRecord::Migration[6.1]
  def change
    create_table :user_org_tables do |t|
      t.references :user, null: false, foreign_key: true
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
