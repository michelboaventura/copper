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
      File.open(File.join(path, 'sentimento'), 'w') do |f|
        f << io.read
      end
    end
    build_sentimento_json(path)
  end

  def build_sentimento_json(path)
    hash = {media_item: [], media_participante: [], media_matriz: {column: [], row: [], links: []}}
    avg = {commentable: {}, author: {}}

    i = j = -1
    File.open(File.join(path, 'sentimento')).each_line do |line|
      array = line.split(' ')
      comment_id = array.first
      value = array.last.to_f

      comment = Comment.find(comment_id)
      part = comment.part

      part_key   = [part.id, part.name].join('|')
      author_key = [comment.author_id, comment.author_name].join('|')

      if avg[:commentable][part_key].nil?
        i += 1
        avg[:commentable][part_key] = []
      end

      avg[:commentable][part_key] << value

      if avg[:author][author_key].nil?
        j += 1
        avg[:author][author_key] = []
      end
      avg[:author][author_key] << value

      hash[:media_matriz][:links] << {
        source: j,
        target: i,
        value: value.to_s
      }
    end

    avg[:commentable].each_pair do |key, array|
      commentable_id, commentable_name = key.split('|')
      hash[:media_item] << {
        commentable_id: commentable_id,
        commentable_name: commentable_name,
        sentiment_avg: (array.sum / array.count.to_f).to_s
      }
      hash[:media_matriz][:column] << {name: commentable_name}
    end

    avg[:author].each_pair do |key, array|
      author_id, author_name = key.split('|')
      hash[:media_participante] << {
        author_id: author_id,
        author_name: author_name,
        sentiment_avg: (array.sum / array.count.to_f).to_s
      }
      hash[:media_matriz][:row] << {name: author_name}
    end

    File.open(File.join(path, 'sentimento.json'), 'w') do |f|
      f << hash.to_json
    end
  end
end
