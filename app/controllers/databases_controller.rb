class DatabasesController < ApplicationController
  before_action :set_database, only: [:show, :update, :destroy]

  # GET /databases
  def index
    @databases = Database.all

    render json: @databases
  end

  # GET /databases/1
  def show
    render json: @database
  end

  # POST /databases
  def create
    my_params = database_params
    file = my_params.delete("file") rescue nil

    @database = Database.new(my_params)
    @database.user_id = 1 #TODO

    if @database.save
      ImportDatabaseJob.new(file.read, @database.id).perform_now
      render json: @database, status: :created
    else
      render json: @database.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /databases/1
  def update
    if @database.update(database_params)
      render json: @database
    else
      render json: @database.errors, status: :unprocessable_entity
    end
  end

  # DELETE /databases/1
  def destroy
    @database.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_database
    @database = Database.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def database_params
    params.require(:database).permit(:name, :description, :file, :data_format, :data_type)
  end
end
