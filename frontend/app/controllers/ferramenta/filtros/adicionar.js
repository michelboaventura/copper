import Ember from 'ember';

export default Ember.Controller.extend({
  datasource: null,

  actions: {
    selectDatasource(params){
      this.set('datasource', params);
    }
  }
});
