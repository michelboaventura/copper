class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname, :fullname, :email, :expiration
end
