class TopicoJob < ApplicationJob
  queue_as :default

  def perform(path)
    IO.popen([
      Rails.root.join('algorithms', 'topicos', 'run_topicos.sh').to_s,
      path.join('comments.json').to_s
    ]) do |io|
      File.open(File.join(path, 'topicos'), 'w') do |f|
        f << io.read
      end
    end
    build_topicos_json(path)
  end

  private

  def build_topicos_json(path)
    topicos = []

    file = File.open(File.join(path, 'topicos'), 'r')

    file.each_line do |line|
      break unless line =~ /\Atopic/

      fields = line.strip.split(" ")
      fields.delete_at(0) #topic
      id = fields.delete_at(0)
      words = fields.inject([]) do |acc, el|
        key, value = el.split(':')
        acc << [key, value.to_f]
      end
      topicos << build_topico(id, words)
    end

    file.each_line do |line|
      fields = line.strip.split(" ")
      fields.delete_at(0) #doc
      comment_id = fields.delete_at(0)
      category = Comment.find(comment_id).part.category
      max = -1
      topico_id = 0

      fields.each_with_index do |value, i|
        value = value.to_f
        if value > max
          topico_id = i
          max = value
        end
      end
      topico = topicos.find{|t| t[:topico_id] == topico_id.to_s}
      topico[:contagem_comentarios] += 1

      if freq_eixo = topico[:frequencia_eixos].find{|t| t[0] == category}
        freq_eixo[1] += 1
      else
        topico[:frequencia_eixos] << [category, 1]
      end
    end

    File.open(File.join(path, 'topicos-vis.json'), 'w') do |f|
      f << topicos.to_json
    end
  end

  def build_topico(id, words)
    {
      nome: "Topico #{id}",
      topico_id: id,
      contagem_comentarios: 0,
      frequencia_eixos: [],
      top_palavras: words,
    }
  end
end
