class Organization < ApplicationRecord
    has_many :users
    has_many :repositories
end
