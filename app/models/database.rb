class Database
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :parts
  has_many :comments
  has_many :jobs

  validates_presence_of :name, :user_id, :description, :data_type, :data_format

  field :name, type: String
  field :user_id, type: Integer
  field :description, type: String
  field :data_type, type: String
  field :data_format, type: String
end
