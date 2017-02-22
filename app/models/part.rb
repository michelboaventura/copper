class Part
  include Mongoid::Document

  belongs_to :database
  belongs_to :parent, class_name: 'Part', optional: true
  has_many :comments

  field :category, type: String
  field :text, type: String
  field :member, type: String
  field :name, type: String
  field :type, type: String
end
