import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin,{
  session: service(),
  sessionAccount: service(),

  actions: {
    willTransition() {
      if(this.get('session.isAuthenticated')){
        this.get('sessionAccount').loadCurrentUser();
      }
    },
  },
});
