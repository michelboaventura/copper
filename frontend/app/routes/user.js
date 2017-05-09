import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    this._super(...arguments);
    return this.get('store').findRecord('user', params.id);
  },
  actions: {
    goToJobs(){
      this.transitionTo('consults');
    }
  }
});
