class User < ApplicationRecord
  validates: :access_token, presence: true
  validates: :name, presence: true
  
  has_many :user_org_tables
  has_many :organizations, through: :user_org_tables
end
