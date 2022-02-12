class DependabotAlert < ApplicationRecord
    validates :node_id, presence: true
    validates :severity, presence: true

    belongs_to :repository
end
