class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def create
    @message = Message.new message_params
    @message.save!
  end

  def live
    render json: last_message
  end

  private

  def last_message
    Message.last.as_json
  end

  def message_params
    params.require(:message).permit(:name, :message)
  end
end
