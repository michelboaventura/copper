class JobSerializer < ActiveModel::Serializer
  attributes :id, :name, :filter, :public, :started, :finished, :status
  belongs_to :user
  belongs_to :datasource
end
