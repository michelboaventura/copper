class CorrelacaoJob < ApplicationJob
  queue_as :default

  def perform(path)
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

  private

  def build_correlacao_json(path)
    out = []

    File.open(File.join(path, 'correlacao')).each_line do |line|
      author_ids, members = line.chomp.split(' ').map{|l| l.split(',')}

      part_ids = Part.in(member: members).pluck(:id)
      comments = Comment.in(author_id: author_ids, part_id: part_ids)

      next if comments.empty?

      result = {rows: Set.new, columns: Set.new, links: []}

      comments.each do |comment|
        part = comment.part
        parts = Part.where(member: part.member)
        part = parts.sort{|a,b| a.name.size <=> b.name.size}.first
        part_id = part.id.to_s

        #TODO group?
        result[:rows] << {id: comment.author_id, name: comment.author_name}

        #TODO group?
        result[:columns] << {id: part_id, name: part.name, group: part.category}

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
end
