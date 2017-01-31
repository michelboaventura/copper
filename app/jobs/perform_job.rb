require 'tempfile'

class PerformJob < ApplicationJob
  queue_as :default

  def perform(job)
    job.update_attributes(status: 'RUNNING', started: Time.now)
    filter = JSON.parse(job.mongo_query)
    types = /#{job.types.remover_acentos}/i
    database = job.database

    part_ids = database.parts.where(type: types).pluck(:id)
    comments = database.comments.in(part_id: part_ids).where(filter)

    if comments.empty?
      job.update_attribute(:status, "EMPTY")
      return
    end

    path = Rails.root.join('public', 'json')
    Dir.mkdir(path) rescue nil

    path = Rails.root.join('public', 'json', job.id.to_s)
    Dir.mkdir(path) rescue nil

    ExtractCommentsJob.new(comments, path).perform_now
    SearchJob.new(path).perform_now
    SentimentoJob.new(path).perform_now
    CorrelacaoJob.new(path).perform_now
    CoocorrenciaJob.new(path).perform_now
    WordtreeJob.new(path).perform_now

    job.update_attributes(status: 'COMPLETED', finished: Time.now)
  end
end
