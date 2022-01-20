class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :access_token
      t.string :name

      t.timestamps
    end
  end
end
