class Repository < ApplicationRecord
  validates :name, presence: true
  belongs_to :organization
  has_many :dependabot_alerts
end
