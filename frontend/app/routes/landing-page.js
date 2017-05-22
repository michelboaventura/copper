import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),

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
