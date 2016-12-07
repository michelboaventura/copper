require 'tempfile'

class PerformJob < ApplicationJob
  queue_as :default

  def perform(job_id)
    job = Job.find(job_id)
    filter = /.*#{job.filter}.*/
    database = job.database

    #parts = database.parts.
    #  where(commentable_type: {in: job.types}).
    #  any_of(commentable_text: filter, commentable_name: filter)

    comments = database.comments.any_of(text: filter)

    path = Rails.root.join('public', 'json', job.id.to_s)

    Dir.mkdir(path) rescue nil

    #File.open(File.join(path, "parts.json"), 'w') do |f|
    #  f << parts
    #end

    comments_path = File.join(path, 'comments.json')
    File.open(comments_path, 'w') do |f|
      comments.each do |comment|
        f << comment.to_json << "\n"
      end
    end

    run_sentimento(path)

    job.status = "done"
    job.save
  end

  def run_sentimento(path)
    IO.popen([
      Rails.root.join('algorithms', 'sentimento', 'run_sentiment.sh').to_s,
      path.join('comments.json').to_s
    ]) do |io|
      File.open(File.join(path, 'sentimento.json'), 'w') do |f|
        f << io.read
      end
    end
  end
end
