class CodeAlert < ApplicationRecord
  validates :alert_number, presence: true

  belongs_to :repository
end
