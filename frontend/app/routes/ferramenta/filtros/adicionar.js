import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
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
    model.job.public = true;
    if(!base){
      model.job.datasource = model.datasources.get('firstObject.id');
    }
  },
});
