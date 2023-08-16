class GuestsController < ApplicationController
  protect_from_forgery with: :null_session, only: :add_points

  def index
    @guests = Guest.all
  end

  def points
    @guests = Guest.ranked
  end

  def add_points
    @guest = Guest.find(params[:id])
    @guest.add_points(points_params[:points].to_i)
    @guest.save!
  end

  def new
    @guest = Guest.new
  end

  def create
    @guest = Guest.new guest_params
    if @guest.save
      redirect_to guests_path
    else
      render :new
    end
  end

  def destroy
    @guest = Guest.find(params[:id])
    begin
      @guest.destroy
    rescue ActiveRecord::DeleteRestrictionError => e
      @guest.errors.add(:base, e)
    ensure
      redirect_to guests_path
    end
  end

  private

  def guest_params
    params.require(:guest).permit(:name, :points)
  end

  def points_params
    params.permit(:points)
  end
end
