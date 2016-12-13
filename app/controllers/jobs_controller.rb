class JobsController < ApplicationController
  before_action :set_job, only: [:show, :update, :destroy]

  # GET /jobs
  def index
    @jobs = Job.all

    render json: @jobs
  end

  # GET /jobs/1
  def show
    render json: @job
  end

  # POST /jobs
  def create
    @job = Job.new(job_params_clear)

    if @job.save
      PerformJob.perform_later(@job.id.to_s)
      render json: @job, status: :created, location: @job
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /jobs/1
  def update
    if @job.update(job_params)
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
    params.fetch(:job, {})
  end

  def job_params_clear
    job_params_clear = {}
    job_params_clear[:database] = Database.last
    job_params_clear[:name] = job_params[:name]
    job_params_clear[:user_id] = job_params[:user][:id]
    job_params[:tasks].each_pair do |key, value|
      if my_filter = value.dig(:forms, :filter)
        job_params_clear[:filter] = my_filter
        job_params_clear[:types] = parseTypes(value[:forms][:types])
      end
    end
    job_params_clear[:status] = "WAITING"
    return job_params_clear
  end
  def parseTypes types
    types.join("|")
  end
end
