class JsonController < ApplicationController
  def index
    #TODO Descomentar quando tivermos current_user implementado
    #job = Job.find(params[:job_id])
    #if job.public? || job.user_id == current_user.id
    if true
      path = %W{data #{params[:job_id]} #{params[:visualization]}.json}
      send_file(Rails.root.join(*path), disposition: 'inline')
    else
      head :no_content
    end
  end
end
