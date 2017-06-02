import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params){
    this._super(...arguments);
    return RSVP.hash({
      job: {datasource: params.base},
      datasources: this.store.query('datasource', {per_page: 100}),
    });
  },
});
