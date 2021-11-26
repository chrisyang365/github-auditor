class User < ApplicationRecord
  validates :access_token, presence: true
  validates :login, presence: true
  
  has_many :user_org_tables
  has_many :organizations, through: :user_org_tables
end
