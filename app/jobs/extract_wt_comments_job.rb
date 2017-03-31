class ExtractWtCommentsJob < ApplicationJob
  queue_as :default

  def perform(comments, comments_path, terms)
    File.open(comments_path, 'w') do |f|
      comments.each do |comment|
        c = comment[:text].split(/[ \n.,]/)

        c.each_with_index do |word, i|
          if terms.include?(word)
            f << c[i..(i + 50)].join(" ") << "\n"
          end
        end
      end
    end
  end
end
