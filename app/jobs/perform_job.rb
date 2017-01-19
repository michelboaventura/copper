require 'tempfile'

class PerformJob < ApplicationJob
  queue_as :default

  def perform(job_id)
    job = Job.find(job_id)
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

    path = Rails.root.join('public', 'json', job.id.to_s)

    Dir.mkdir(path) rescue nil

    comments_path = File.join(path, 'comments.json')
    File.open(comments_path, 'w') do |f|
      comments.each do |comment|
        c = comment.attributes
        c[:article] = comment.part.article
        c[:id] = comment.id.to_s
        c[:part_name] = comment.part.name
        f << c.to_json << "\n"
      end
    end

    run_search(path)
    run_sentimento(path)
    run_correlacao(path)

    job.update_attributes(status: 'COMPLETED', finished: Time.now)
  end

  def run_search(path)
    build_search_json(path)
  end

  def run_correlacao(path)
    IO.popen([
      Rails.root.join('algorithms', 'correlacoes', 'run_correlacao.sh').to_s,
      path.join('comments.json').to_s
    ]) do |io|
      File.open(File.join(path, 'correlacao'), 'w') do |f|
        f << io.read
      end
    end
    build_correlacao_json(path)
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

  def build_search_json(path)
    out = []
    File.open(File.join(path, 'comments.json')).each_line do |line|
      json = JSON.parse(line)
      out << json.slice(*%w{author_name text part_name})
    end

    File.open(File.join(path, 'search.json'), 'w') do |f|
      f << out.to_json
    end
  end

  def build_correlacao_json(path)
    out = []
    File.open(File.join(path, 'correlacao')).each_line do |line|
      author_ids, article_ids = line.chomp.split(' ').map{|l| l.split(',')}
      author_ids.map!(&:to_i)

      part_ids = Part.in(article: article_ids).pluck(:id)
      comments = Comment.in(author_id: author_ids, part_id: part_ids)

      rows = Set.new
      columns = Set.new
      links = Set.new
      result = {row: [], column: [], links: []}

      comments.each do |comment|
        part = comment.part

        if !rows.find_index(comment.author_name)
          rows << comment.author_name
          result[:row] << {name: comment.author_name}
        end

        if !columns.find_index(part.article)
          name = Part.where(article: part.article).pluck(:name).sort{|a,b| a.size <=> b.size}.first
          columns << part.article
          result[:column] << {name: name, group: part.axis}
        end

        source = rows.find_index(comment.author_name)
        target = columns.find_index(part.article)
        key = "#{source}|#{target}"
        if !links.find_index(key)
          links << key
          result[:links] << { source: source, target: target, value: 1}
        else
          r = result[:links].find_index {|l| l[:source] == source && l[:target] == target}
          result[:links][r][:value] += 1
        end
      end
      out << result
    end
    hash = {}

    out.each_with_index do |el, i|
      hash[i + 1] = el
    end

    File.open(File.join(path, 'correlacao.json'), 'w') do |f|
      f << hash.to_json
    end
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
      part = Part.where(article: comment.part.article).sort{|a,b| a.name.size <=> b.name.size}.first

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
