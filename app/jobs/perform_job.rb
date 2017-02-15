class PerformJob < ApplicationJob
  queue_as :default

  def perform(job_id)
    job = Job.find(job_id)
    job.update_attributes(status: 'RUNNING', started: Time.now)

    # We need to add a /i option to allow insensitive query
    query = job.mongo_query.gsub(/({"\$regex":".*")}/, '\1, "$options": "i"}')

    filter = JSON.parse(query)
    types = /#{job.types.remover_acentos}/i
    database = job.database

    part_ids = database.parts.where(type: types).pluck(:id)
    comments = database.comments.in(part_id: part_ids).where(filter)
    full_comments = database.comments.in(part_id: part_ids)
    terms = query.scan(/\$regex":"([^"]*)"/).flatten

    if comments.empty?
      job.update_attribute(:status, "EMPTY")
      return
    end

    path = Rails.root.join('public', 'json')
    Dir.mkdir(path) rescue nil

    path = Rails.root.join('public', 'json', job.id.to_s)
    Dir.mkdir(path) rescue nil

    SaveTermsJob.new(terms, path).perform_now
    ExtractFullCommentsJob.new(full_comments, path).perform_now
    ExtractCommentsJob.new(comments, path).perform_now
    SearchJob.new(path).perform_now
    SentimentoJob.new(path).perform_now
    CorrelacaoJob.new(path).perform_now
    CoocorrenciaJob.new(path).perform_now
    WordtreeJob.new(path).perform_now
    PartItemJob.new(path).perform_now
    TopicoJob.new(path).perform_now

    job.update_attributes(status: 'COMPLETED', finished: Time.now)
  end
end
