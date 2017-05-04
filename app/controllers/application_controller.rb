class ApplicationController < ActionController::API
  require './lib/json_web_token.rb'

  private

  def validates_current_user
    if decoded_auth_token
      @current_user = User.find(decoded_auth_token[:id])
    else
      head :forbidden
    end
  end

  def set_current_user
    if decoded_auth_token
      @current_user = User.find(decoded_auth_token[:id])
    end
  end

  def decoded_auth_token
    if request.headers['Authorization'].present?
      token = request.headers['Authorization'].split(' ').last
      JsonWebToken.decode(token)
    end
  end

  def authenticate_request
    unless @current_user
      render json: { errors: "Not Authorized" }, status: :unauthorized
    end
  end
end
