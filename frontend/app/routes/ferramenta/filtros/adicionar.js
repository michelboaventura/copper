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
  setupController(controller, model){
    this._super(controller, model);
    var base = controller.get('base');
    if(!base){
      model.job.datasource = model.datasources.get('firstObject.id');
    }
  },
});
