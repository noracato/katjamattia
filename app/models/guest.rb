# frozen_string_literal: true

class Guest < ApplicationRecord
  has_many :point_events
  scope :ranked, -> { order('`points` DESC') }

  def add_points(number)
    if self.points + number < 0
      number = -self.points
    end

    self.points += number

    point_events.create!(points: number)
  end
end
