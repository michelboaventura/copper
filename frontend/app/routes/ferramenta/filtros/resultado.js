import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Route.extend({

  model(params) {
    this._super(...arguments);

    return this.store.findRecord('job', params.id).then((job) => {
      return {
        job: job,
        component: `visualizations/${params.which}`,
        url: `${config.mj_data_explorer}/json/${params.id}/${params.which}.json`,
        search: params.search,
        filter: job.get('filter')
      };
    });
  },
});
