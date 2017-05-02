import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: Ember.inject.service(),

  actions: {
    didTransition(){
      this.get('sessionAccount').loadCurrentUser();
    },
  }
});
