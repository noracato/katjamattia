class GuestsController < ApplicationController
  def index
    @guests = Guest.ranked
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
end
