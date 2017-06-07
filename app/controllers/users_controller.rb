class UsersController < ApplicationController
  before_action :set_current_user
  before_action :authenticate_request, except: [:create, :show]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params_serialized)

    if @user.save
      render json: @user, status: :created, location: @user
      return
    else
      render json: ErrorSerializer.serialize(@user.errors),  status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params_serialized)
      render json: @user
    else
      render json: ErrorSerializer.serialize(@user.errors), status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def change_password
    if @current_user && @current_user.valid_password?(password_params[:current_password]) && @current_user.update(password_params.except(:current_password))
      render json: @current_user
    else
      render json: ErrorSerializer.serialize(@current_user.errors), status: :unprocessable_entity
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  def password_params
    params.require(:password).permit(:current_password, :password, :password_confirmation)
  end

  # Only allow a trusted parameter "white list" through.
  def user_params_serialized
    res = ActiveModelSerializers::Deserialization.jsonapi_parse(params)
  end
end
