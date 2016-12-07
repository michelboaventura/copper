class Database
  include Mongoid::Document
  has_many :parts
  has_many :comments

  field :name, type: String
  field :user_id, type: Integer
  field :description, type: String
  field :data_type, type: String
  field :size, type: String
end
