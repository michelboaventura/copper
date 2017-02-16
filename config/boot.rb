ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'rails/commands/server'
module Rails
  class Server
    def default_options
      super.merge({Port: 8000, Host: '127.0.0.1'})
    end
  end
end
