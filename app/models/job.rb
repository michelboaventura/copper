class Job
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :database

  field :filter, type: String
  field :types, type: String
  field :status, type: String
end
