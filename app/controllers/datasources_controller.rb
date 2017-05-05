class DatasourcesController < ApplicationController
  before_action :validates_current_user
  before_action :authenticate_request
  before_action :set_datasource, only: [:show, :update, :destroy]

  # GET /datasources
  def index
    @datasources = Datasource.all

    render json: @datasources
  end

  # GET /datasources/1
  def show
    render json: @datasource
  end

  # POST /datasources
  def create
    my_params = datasource_params
    file = my_params.delete("file") rescue nil

    @datasource = Datasource.new(my_params)

    if @datasource.save
      ImportDatasourceJob.new(file.read, @datasource.id).perform_now
      render json: @datasource, status: :created, location: @datasource
    else
      render json: @datasource.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /datasources/1
  def update
    if @datasource.update(datasource_params)
      render json: @datasource
    else
      render json: @datasource.errors, status: :unprocessable_entity
    end
  end

  # DELETE /datasources/1
  def destroy
    @datasource.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_datasource
    @datasource = Datasource.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def datasource_params
    params.require(:datasource).permit(:name, :description, :file, :data_format, :data_type, :user_id)
  end
end
