class Organization < ApplicationRecord
  validates :name, presence: true
  validates :avatar_url, presence: true
  validates :two_factor_requirement_enabled, inclusion: { in: [ true, false ] }
  validates :billing_plan, presence: true

  has_many :repositories
  has_many :user_org_tables
  has_many :users, through: :user_org_tables
end
