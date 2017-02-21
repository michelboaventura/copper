class ExtractCommentsJob < ApplicationJob
  queue_as :default

  def perform(comments, path)
    comments_path = File.join(path, 'comments.json')
    File.open(comments_path, 'w') do |f|
      comments.each do |comment|
        c = comment.attributes
        c[:member] = comment.part.member
        c[:id] = comment.id.to_s
        c[:part_name] = comment.part.name
        f << c.to_json << "\n"
      end
    end
  end
end
