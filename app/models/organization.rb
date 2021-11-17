class Organization < ApplicationRecord
    validates :name, presence: true
    validates :two_factor_requirement_enabled, presence: true
    has_many :users
    has_many :repositories
end
