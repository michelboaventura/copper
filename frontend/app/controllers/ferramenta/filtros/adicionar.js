import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['base'],
  base: null,
  datasource: null,

  actions: {
    selectDatasource(params){
      this.set('datasource', params);
    }
  }
});
