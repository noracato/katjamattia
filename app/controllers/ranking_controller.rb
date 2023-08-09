class RankingController < ApplicationController
  def index
    @guests = Guest.ranked
  end
end
