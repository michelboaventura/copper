class Job
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :database

  field :name, type: String
  field :user_id, type: Integer
  field :filter, type: String
  field :types, type: String
  field :status, type: String
  field :workflow_id, type: Integer
  field :started, type: DateTime
  field :finished, type: DateTime
  field :mongo_query, type: String
end
