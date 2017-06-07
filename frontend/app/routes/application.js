import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{
  session: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),

  actions: {
    willTransition() {
      if(this.get('session.isAuthenticated')){
        this.get('sessionAccount').loadCurrentUser();
      }
    },
  },
});
