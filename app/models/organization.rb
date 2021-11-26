class Organization < ApplicationRecord
  validates :name, presence: true
  validates :avatar_url, presence: true
  validates :two_factor_requirement_enabled, presence: true

  has_many :repositories
  has_many :user_org_tables
  has_many :users, through: :user_org_tables
end
