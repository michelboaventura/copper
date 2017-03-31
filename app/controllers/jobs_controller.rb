class JobsController < ApplicationController
  before_action :set_job, only: [:show, :update, :destroy]

  # GET /jobs
  def index
    if params[:user_id]
      @jobs = Job.where(user_id: params[:user_id])
    elsif params[:public]
      @jobs = Job.where(public: params[:public], status: 'COMPLETED')
    end
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
      JSON.parse(params.fetch(:job, {})).with_indifferent_access
    end

    def job_params_clear
      job_params_clear = {}
      job_params_clear[:database_id] = job_params[:datasource]
      job_params_clear[:public] = job_params[:public]
      job_params_clear[:name] = job_params[:name]
      job_params_clear[:user_id] = job_params[:user][:id]
      job_params_clear[:user_name] = job_params[:user][:name]
      my_filter = job_params[:tasks].select { |value| value.dig(:forms, :filter) }
      my_filter = my_filter.first[:forms]
      job_params_clear[:filter] = my_filter[:filter]
      job_params_clear[:mongo_query] = my_filter[:mongo_query].to_json
      job_params_clear[:types] = parse_types(my_filter[:types])
      job_params_clear[:workflow_id] = job_params[:workflow_id].to_i
      job_params_clear[:status] = "WAITING"
      job_params_clear
    end

    def parse_types types
      types.join("|")
    end
  end
