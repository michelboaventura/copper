class JobsController < ApplicationController
  before_action :validates_current_user, except: [:index]
  before_action :set_current_user
  before_action :set_job, only: [:show, :update, :destroy]

  # GET /jobs
  def index
    if params[:public]
      @jobs = Job.where(public: params[:public], status: 'COMPLETED')
    else
      @jobs = Job.where(user: @current_user).order_by(:created_at.desc)
    end

    render json: @jobs
  end

  # GET /jobs/1
  def show
    render json: @job
  end

  # POST /jobs
  def create
    @job = Job.new(job_params)

    if @job.save
      PerformJob.perform_later(@job.id.to_s)
      render json: @job, status: :created, location: @job
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /jobs/1
  def update
    if @job.update({public: params[:public]})
      render json: @job
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # DELETE /jobs/1
  def destroy
    @job.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_job
    @job = Job.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def job_params
    res = ActiveModelSerializers::Deserialization.jsonapi_parse(params)
    res[:mongo_query] = res[:mongo_query].to_json
    res
  end

  def parse_types types
    types.join("|")
  end
end
