class Repository < ApplicationRecord
  validates :name, presence: true
  belongs_to :organization
end
