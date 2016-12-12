class Job
  include Mongoid::Document

  belongs_to :database

  field :filter, type: String
  field :types, type: String
  field :status, type: String
end
