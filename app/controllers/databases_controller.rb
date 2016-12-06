class DatabasesController < ApplicationController

  def index
    biding.pry
    render json: Database.all.as_json
  end
  def create

    database = Database.new(params)
    binding.pry
    database.save
    render json: database.as_json
  end
  def show
    binding.pry
    render json: Database.find(params[:id])
  end

end
