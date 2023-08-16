# frozen_string_literal: true

class PointEvent < ApplicationRecord
  belongs_to :guest

  def as_json
    { id: id, guest: guest.id, points: points, name: guest.name }
  end
end
