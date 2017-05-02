class Job
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :user
  belongs_to :datasource

  field :name, type: String
  field :filter, type: String
  field :types, type: String
  field :mongo_query, type: String
  field :public, type: Boolean

  field :started, type: DateTime
  field :finished, type: DateTime
  field :status, type: String, default: "WAITING"

end
