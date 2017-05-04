class Database
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :parts
  has_many :comments
  has_many :jobs

  validates_presence_of :name, :description, :data_type, :data_format
  belongs_to :user

  field :name, type: String
  field :description, type: String
  field :data_type, type: String
  field :data_format, type: String
end
