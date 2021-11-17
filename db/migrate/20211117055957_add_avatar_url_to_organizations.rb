class AddAvatarUrlToOrganizations < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :avatar_url, :string
  end
end
