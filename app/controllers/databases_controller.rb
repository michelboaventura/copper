class DatabasesController < ApplicationController

  def index
    render json: Database.all.as_json
  end
  def create
    database = Database.new(params)
    database.save
    render json: database.as_json
  end
  def show
    render json: Database.find(params[:id])
  end

end
