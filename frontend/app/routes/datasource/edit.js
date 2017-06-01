import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    return this.get('store').findRecord('datasource', params.id);
  },
  actions:{
    save(){
      this.get('currentModel').save()
    },
  }
});
