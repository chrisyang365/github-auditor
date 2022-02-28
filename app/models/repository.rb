class Repository < ApplicationRecord
  validates :name, presence: true
  belongs_to :organization
  has_many :dependabot_alerts
  has_many :code_alerts
  has_many :secret_alerts
end
