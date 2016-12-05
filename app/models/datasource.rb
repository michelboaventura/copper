class Datasource
  include Mongoid::Document
  field :name, type: String
  field :user_id, type: Integer
  field :description, type: String
  field :data_type, type: String
  field :format, type: String
  field :size, type: String
  field :text, type: String
end
