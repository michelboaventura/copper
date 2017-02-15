class SaveTermsJob < ApplicationJob
  queue_as :default

  def perform(terms, path)
    terms_path = File.join(path, 'terms')
    File.open(terms_path, 'w') do |f|
      f << terms.join('|')
    end
  end
end
