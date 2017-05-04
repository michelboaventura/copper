import Ember from 'ember';
import config from '../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),
  sessionAccount: service(),

  emailFormGroup: 'form-group',
  invalidEmailErrorMessage: null,
  passwordFormGroup: 'form-group',
  invalidPasswordErrorMessage: null,

  createAccount: function(userData){

    var requestOptions = {
      url: `${config.mj_data_explorer}/users`,
      type: 'POST',
      data: {user: userData}
    };
    return new Promise((resolve, reject) => {
      ajax(requestOptions).then(
        () => { run(() => { resolve( {email: userData.email, password: userData.password} ); }); },
        (error) => { run(() => { reject(error.responseJSON); }); });
    });
  },

  resetAlerts(){
    this.setProperties({
      mailFormGroup: 'form-group',
      invalidEmailErrorMessage: null,
      passwordFormGroup: 'form-group',
      invalidPasswordErrorMessage: null,
    });
  },

  alertErrors(errors){
    if (errors.email){
      this.set('emailFormGroup', 'form-group has-error');
      this.set('invalidEmailErrorMessage', `This email ${errors.email}`);
    } else if (errors.password){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', `Password ${errors.password}`);
    } else if (errors.password_confirmation){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', `Password ${errors.password_confirmation}`);
    }
  },

  actions:{
    signup(){
      var me = this;
      me.resetAlerts();
      let userData = me.getProperties('email', 'password','firstname', 'lastname', 'password_confirmation');
      me.createAccount(userData)
        .catch(function(reason){ if(reason.errors){ me.alertErrors(reason.errors); }})
        .then( function() {
          me.get('session').authenticate('authenticator:oauth2', userData.email, userData.password);
        });
    },
  },
});
