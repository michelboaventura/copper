class DatasourcesController < ApplicationController
    def index
      render json: Datasource.all.as_json
    end
end
