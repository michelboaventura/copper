import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),
  sessionAccount: service(),

  init() {
    this._super(...arguments);
    this.set('notAgreed', null);
    this.addObserver('agreed', this, 'clearUncheckError');
  },

  clearUncheckError(){
    this.set('notAgreed', null);
  },

  create(user, controller){
    user.save().then(function() {
      controller.get('session').authenticate('authenticator:oauth2', user.get('email'), user.get('password'));
    });
  },

  actions:{
    signup(){
      if(this.get('agreed')){
        var controller = this;
        var user = controller.get('model');
        this.get('create')(user, controller);
      } else {
        this.set('notAgreed', 'Para continuar é necessário concordar com os termos.');
      }
    },
  },
});

