class DatasourceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :data_type, :data_format, :created_at, :updated_at
  belongs_to :user
  has_many :jobs
end
