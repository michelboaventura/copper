class SearchJob < ApplicationJob
  queue_as :default

  def perform(path)
    build_search_json(path)
  end

  private

  def build_search_json(path)
    out = []
    File.open(File.join(path, 'comments.json')).each_line do |line|
      json = JSON.parse(line)
      out << json.slice(*%w{author_name text part_name})
    end

    File.open(File.join(path, 'search-tool.json'), 'w') do |f|
      f << out.to_json
    end
  end
end
