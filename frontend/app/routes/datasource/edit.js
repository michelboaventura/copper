import Ember from 'ember';
import config from '../../config/environment';

const {$: { ajax }} = Ember;

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    return this.get('store').findRecord('datasource', params.id);
  },
  actions:{
    save(){
      var datasource = this.currentModel;
      ajax({
        url: `${config.mj_data_explorer}/datasources/${datasource.id}`,
        type: 'PATCH',
        data: {database: datasource}
      });
    },
  }
});
