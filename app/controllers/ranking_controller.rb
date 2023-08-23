class RankingController < ApplicationController
  def index
    @guests = Guest.ranked
    @last_change_id = PointEvent.last&.id || 0
  end

  def live
    render json: ranking_details
  end

  private

  def ranking_details
    {
      order: Guest.ranked.map { |guest| { id: guest.id, points: guest.points } },
      last_change: PointEvent.last.as_json
    }
  end
end
