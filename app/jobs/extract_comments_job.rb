class ExtractCommentsJob < ApplicationJob
  queue_as :default

  def perform(comments, comments_path, stopwords = [])
    File.open(comments_path, 'w') do |f|
      comments.each do |comment|
        c = comment.attributes
        part = comment.part

        unless stopwords.empty?
          c[:text] = c[:text].split(" ").reject do |w|
            stopwords.include?(w.remover_acentos.downcase)
          end.join(" ")
        end

        c[:member] = part.member
        c[:id] = comment.id.to_s
        c[:part_name] = part.name
        c[:category] = "Eixo #{part.category}"
        f << c.to_json << "\n"
      end
    end
  end
end
