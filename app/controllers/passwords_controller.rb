class PasswordsController < Devise::PasswordsController
  def create
    resource = User.send_reset_password_instructions(params.fetch(:user))
    respond_with resource
  end
end
