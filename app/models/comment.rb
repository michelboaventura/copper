class Comment
  include Mongoid::Document

  belongs_to :database
  belongs_to :part
  belongs_to :parent, class_name: 'Comment', optional: true

  field :text, type: String
  field :author_name, type: String
  field :date, type: DateTime
  field :author_id, type: String
end
