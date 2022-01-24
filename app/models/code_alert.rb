class CodeAlert < ApplicationRecord
    validates :name, presence: true
    validates :description, presence: true
    validates :status, presence: true
    validates :severity, presence: true

    belongs_to :repository
end
