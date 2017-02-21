class SentimentoJob < ApplicationJob
  queue_as :default

  def perform(path)
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

  private

  def build_sentimento_json(path)
    result = {rows: Set.new, columns: Set.new, links: []}
    links = Hash.new {|h,k| h[k] = []}

    File.open(File.join(path, 'sentimento')).each_line do |line|
      comment_id, value = line.split(' ')

      comment = Comment.find(comment_id)
      part = comment.part
      parts = Part.where(member: comment.part.member)
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
end
