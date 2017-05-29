class JobsController < ApplicationController
  before_action :validates_current_user, except: [:index]
  before_action :authenticate_request, except: [:index]
  before_action :set_current_user
  before_action :set_job, only: [:show, :update, :destroy]

  # GET /jobs
  def index
    if params[:public]
      @jobs = Job.where(public: params[:public], status: 'COMPLETED')
    elsif params[:running]
      @jobs = Job.where(user: @current_user, status: 'RUNNING').order_by(:created_at.desc)
    elsif params[:completed]
      @jobs = Job.where(user: @current_user, :status.ne => 'RUNNING').order_by(:created_at.desc)
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
    if @job.update(job_params.except(:status, :started, :finished))
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
    res[:filter] = filter_stringify(res[:filter]).squish
    res[:mongo_query] = res[:mongo_query].to_json
    res
  end

  def filter_stringify query
    expression = "";
    groupElems = [];
    operationsHash = {not_equal: " NOT EQUAL ", equal: " EQUAL ", contains: " CONTAINS ", AND: " AND ", OR: " OR "};

    begin
      query[:rules].each do |elem|
        if(elem[:condition])
          groupElems << filter_stringify(elem)
        else
          groupElems << operationsHash[elem[:operator].to_sym] + elem[:value]
        end
      end
      expression = groupElems.join operationsHash[query[:condition].to_sym]
      return expression
    ensure
      return query
    end
  end

end
