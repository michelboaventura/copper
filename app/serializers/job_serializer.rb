class JobSerializer < ActiveModel::Serializer
  attributes :id, :name, :filter, :public, :started, :finished, :status, :created_at, :updated_at
  belongs_to :user
  belongs_to :datasource
end
