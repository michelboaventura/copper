import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);

    return this.store.findRecord('job', params.id);
  }
});
