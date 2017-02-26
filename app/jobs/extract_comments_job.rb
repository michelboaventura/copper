class ExtractCommentsJob < ApplicationJob
  queue_as :default

  def perform(comments, comments_path, stopwords = [])
    File.open(comments_path, 'w') do |f|
      comments.each do |comment|
        c = comment.attributes

        unless stopwords.empty?
          c[:text] = c[:text].split(" ").reject do |w|
            stopwords.include?(w.remover_acentos.downcase)
          end.join(" ")
        end

        c[:member] = comment.part.member
        c[:id] = comment.id.to_s
        c[:part_name] = comment.part.name
        f << c.to_json << "\n"
      end
    end
  end
end
