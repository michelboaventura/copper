import config from '../../config/environment';
import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);

    var search = window.location.href.split("?search=")[1];

    search = search == undefined ? "" : decodeURI(search);

    return {
      component: `visualizations/${params.which}`,
      url: `${config.ai_social_rails}/json/${params.id}/${params.which}.json`,
      jobId: `${params.id}`,
      search: search
    };
  }
});
