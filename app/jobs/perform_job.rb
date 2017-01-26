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
    run_coocorrencia(path)
    run_wordtree(path)

    job.update_attributes(status: 'COMPLETED', finished: Time.now)
  end

  def run_search(path)
    build_search_json(path)
  end

  def run_wordtree(path)
    build_wordtree(path)
  end

  def run_coocorrencia(path)
    min_support = 50
    IO.popen([
      Rails.root.join('algorithms', 'coocorrencia', 'run_coocorrencia.sh').to_s,
      path.join('comments.json').to_s,
      min_support.to_s
    ]) do |io|
      File.open(File.join(path, 'coocorrencia'), 'w') do |f|
        f << io.read
      end
    end
    build_coocorrencia_json(path)
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

  def build_wordtree(path)
    IO.popen([
      Rails.root.join('algorithms', 'wordtree', 'run_wordtree.sh').to_s,
      path.join('comments.json').to_s
    ]) do |io|
      File.open(File.join(path, 'wordtree-diagram.json'), 'w') do |f|
        f << io.read
      end
    end
  end

  def build_coocorrencia_json(path)
    out = {
      nodes: Set.new,
      links: []
    }
    File.open(File.join(path, 'coocorrencia'), 'r').each_line do |line|
      src, target, value = line.strip.split(" ")
      out[:nodes] << helper_json_coocorrencia(src)
      out[:nodes] << helper_json_coocorrencia(target)
      out[:links] << {source: src, target: target, value: value, weight: value}
    end

    File.open(File.join(path, 'graph-canvas.json'), 'w') do |f|
      f << out.to_json
    end
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

      result = {rows: Set.new, columns: Set.new, links: []}

      comments.each do |comment|
        part = comment.part
        parts = Part.where(article: part.article)
        part = parts.sort{|a,b| a.name.size <=> b.name.size}.first
        part_id = part.id.to_s

        #TODO group?
        result[:rows] << {id: comment.author_id, name: comment.author_name}

        #TODO group?
        result[:columns] << {id: part_id, name: part.name, group: part.axis}

        link = {row: comment.author_id , column: part_id, value: 1}

        index = result[:links].find_index do |el|
          el[:row] == link[:row] && el[:column] == link[:column]
        end

        if index
          result[:links][index][:value] += 1
        else
          result[:links] << link
        end
      end
      out << result
    end

    File.open(File.join(path, 'correlation-matrix.json'), 'w') do |f|
      f << out.to_json
    end
  end

  def build_sentimento_json(path)
    result = {rows: Set.new, columns: Set.new, links: []}
    links = Hash.new {|h,k| h[k] = []}

    File.open(File.join(path, 'sentimento')).each_line do |line|
      comment_id, value = line.split(' ')

      comment = Comment.find(comment_id)
      part = comment.part
      parts = Part.where(article: comment.part.article)
      part = parts.sort{|a,b| a.name.size <=> b.name.size}.first
      part_id = part.id.to_s

      result[:rows]    << {id: comment.author_id, name: comment.author_name}
      result[:columns] << {id: part_id, name: part.name}
      key = [comment.author_id, part_id]
      links[key] << value.to_f
    end

    links.each_pair do |key, value|
      value = value.inject(:+) / value.count
      result[:links] << {value: value, row: key.first, column: key.last}
    end

    File.open(File.join(path, 'sentiment-analysis.json'), 'w') do |f|
      f << [result].to_json
    end
  end

  private

  def helper_json_coocorrencia(el)
    {
      id: el,
      name: el,
      attrs: {},
      metric: 0,
      group: "",
      community: 0,
      neighbours: {}
    }
  end
end
