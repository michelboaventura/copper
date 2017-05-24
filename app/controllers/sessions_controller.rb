class SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]
  before_action :set_current_user, :invalidate_session, only: [:destroy]
  skip_before_action :verify_signed_out_user

  # POST /resource/sign_in
  def create
    @user = User.find_by(email: sign_in_params[:email])
    if @user && @user.valid_password?(sign_in_params[:password])
      auth_params = JsonWebToken.encode @user.as_json.except('access_token')
      @user.update_attributes(auth_params)
      render json: { data: @user.as_json.except('access_token'), access_token: @user.access_token }
    else
      render json: {errors: [{detail: "email e/ou senha inválidos", source: "data/attributes/email"}, {detail: "email e/ou senha inválidos", source: "data/attributes/password"} ]}, status: :unprocessable_entity
    end
  end

  # DELETE /resource/sign_out
  def destroy
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    params[:user] = {}
    params[:user][:email] = params[:username]
    params[:user][:password] = params[:password]
  end

  def invalidate_session
    @current_user.update_attribute(:access_token, nil)
  end
end
