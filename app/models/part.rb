class Part
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :database
  belongs_to :parent, class_name: 'Part'
  has_many :comments

  field :chapter, type: String
  field :axis, type: String
  field :text, type: String
  field :name, type: String
  field :article, type: String
  field :type, type: String
end
