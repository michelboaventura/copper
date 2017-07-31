import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('job', { public: true })
      .then((results) => { return results.slice(0,8); });
  },
});
