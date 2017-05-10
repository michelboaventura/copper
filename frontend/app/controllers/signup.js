import Ember from 'ember';
import config from '../config/environment';

const { RSVP, $: { ajax }, run } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),
  sessionAccount: service(),

  resetAlerts(){
    var errors = Ember.$('.has-error')
    errors.removeClass('has-error')
  },

  create(user, controller){
    user.save().then(function() {
      controller.get('session').authenticate('authenticator:oauth2', user.get('email'), user.get('password'));
    }).catch((adapterError) => {
      var errors = user.get('errors').toArray();
      for(var i=0, len=errors.length; i<len; i++){
        Ember.$(`#${errors[i].attribute}`).addClass('has-error');
      }
    });
  },

  actions:{
    signup(){
      var controller = this;
      controller.get('resetAlerts')();
      var user = controller.get('model');
      this.get('create')(user, controller);
    },
  },
});
