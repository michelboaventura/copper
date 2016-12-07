class DatabasesController < ApplicationController
  def index
    render json: Database.all.as_json
  end
  def create
    @database = Database.new(params[:datasource])
    @database.save
    render json: @database.as_json
  end
  def show
    render json: Database.find(params[:id])
  end
  def update
    @database = Database.find(params[:id])
    @database.update(params[:datasource])
    render json: @database.as_json
  end
  def destroy
    @database = Database.find(params[:id])
    @database.destroy
  end
end
