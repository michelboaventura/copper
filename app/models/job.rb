class Job
  include Mongoid::Document
  include Mongoid::Timestamps

  scope :is_finished, -> { ne(finished: nil)}

  belongs_to :database

  field :name, type: String
  field :user_id, type: Integer
  field :user_name, type: String ## little workaround
  field :filter, type: String
  field :types, type: String
  field :status, type: String
  field :workflow_id, type: Integer
  field :started, type: DateTime
  field :finished, type: DateTime
  field :mongo_query, type: String
  field :public, type: Boolean

end
