class DatasourcesController < ApplicationController
  before_action :validates_current_user, except: [:show]
  before_action :authenticate_request, except: [:index, :show]
  before_action :set_datasource, only: [:show, :update, :destroy]

  # GET /datasources
  def index
    page = (params[:page] || 1).to_i
    per_page = (params[:per_page] || 5).to_i
    search = /#{params[:search]}/i

    @datasources = Datasource.where(user: @current_user, name: search).order_by(:created_at.desc).page(page).per(per_page)

    render json: @datasources, meta: {total_pages: @datasources.total_pages}
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
      begin
        ImportDatasourceJob.new(file.read, @datasource.id).perform_now
        render json: @datasource, status: :created, location: @datasource
      rescue StandardError => e
        @datasource.destroy
        render json: { errors: [{
          status: "422",
          source: { pointer: "/data/attributes/file" },
          title:  "O arquivo #{file.original_filename} é um arquivo inválido.",
          detail: e.message[0..100]
        } ]}, status: :unprocessable_entity
      end
    else
      render json: @datasource.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /datasources/1
  def update
    if @datasource.update(datasource_params_serialized)
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

  def datasource_params_serialized
    res = ActiveModelSerializers::Deserialization.jsonapi_parse(params)
    res
  end
end
