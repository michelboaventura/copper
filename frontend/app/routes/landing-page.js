import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  model() {
    return this.store
      .query('job', { public: true }).then((results) => {
        return results.sortBy('created_at').slice(0,12);
      });
  },

  setupController(controller, model) {
    if(this.get('session.isAuthenticated')){
      controller.set('isAuthenticated', true);
    }
    this._super(controller, model);
  },

  actions: {
    didTransition(){
      if(this.get('session.isAuthenticated')){
        this.controller.set('isAuthenticated', true);
      }
    },
  },
});
