import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
/* global NProgress */

export default Ember.Route.extend(ApplicationRouteMixin,{
  session: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),

  actions: {
    willTransition(transition) {
      if(this.get('session.isAuthenticated')){
        this.get('sessionAccount').loadCurrentUser();
      }
    },

    loading(transition) {
      NProgress.configure({ easing: 'ease', speed: 1000 });
      NProgress.start();

      transition.promise.finally(function() {
        NProgress.done();
      });
    }

  }
});
