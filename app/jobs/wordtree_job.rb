class WordtreeJob < ApplicationJob
  queue_as :default

  def perform(path)
    build_wordtree(path)
  end

  private

  def build_wordtree(path)
    IO.popen([
      Rails.root.join('algorithms', 'wordtree', 'run_wordtree.sh').to_s,
      path.join('wt_comments.csv').to_s
    ]) do |io|
      File.open(File.join(path, 'wordtree-diagram.json'), 'w') do |f|
        f << io.read
      end
    end
  end
end
