class Comment
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :database
  belongs_to :part
  belongs_to :parent, class_name: 'Comment'

  field :text, type: String
  field :author_name, type: String
  field :source, type: String
  field :date, type: DateTime
  field :author_id, type: String
end
