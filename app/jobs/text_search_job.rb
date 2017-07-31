class TextSearchJob < ApplicationJob
  queue_as :default

  def perform(path, parts)
    build_search_json(path, parts)
  end

  private

  def build_search_json(path, parts)
    out = []
    parts.each do |part|
      out << {author_name: "", text: part.text, part_name: part.name, category: part.type}
    end

    File.open(File.join(path, 'text-search-tool.json'), 'w') do |f|
      f << out.to_json
    end
  end
end
