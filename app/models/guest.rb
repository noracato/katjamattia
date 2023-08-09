# frozen_string_literal: true

class Guest < ApplicationRecord
  scope :ranked, -> { order('`points` DESC') }

  def add_points(number)
    points += number
  end

  def subtract_points(number)
    points -= number

    points = 0 if points < 0
  end
end
