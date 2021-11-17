class User < ApplicationRecord
  validates :login, presence: true
  validates :avatar_url, presence: true
  belongs_to :organization
end
