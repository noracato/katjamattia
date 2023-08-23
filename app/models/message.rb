# frozen_string_literal: true

class Message < ApplicationRecord
  def as_json
    { id: id, name: name, message: message, time: created_at.in_time_zone('CET').strftime("%H:%M") }
  end
end
