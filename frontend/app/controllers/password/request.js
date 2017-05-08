import Ember from 'ember';
import config from '../../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default Ember.Controller.extend({
  successMessage: null,
  processingRequest: false,
  emailFormGroup: 'form-group',
  invalidEmailErrorMessage: null,

  resetAlerts(){
    this.setProperties({
      successMessage: null,
      mailFormGroup: 'form-group',
      invalidEmailErrorMessage: null,
      processingRequest: false,
    });
  },

  actions:{
    request(){
      this.resetAlerts();
      var cred =  this.getProperties('email');
      var requestOptions = {
        url: `${config.mj_data_explorer}/users/password`,
        type: 'POST',
        data: { user: { email: cred.email } }
      };
      return new Promise((resolve, reject) => {
        ajax(requestOptions).then(
          (success) => { run(() => { resolve(success); }); },
          (error) => { run(() => { reject(error.responseJSON); }); }
        );
      })
        .then(() =>{ this.transitionToRoute('/');  })
        .catch((reason) => {
          this.set('emailFormGroup', 'form-group has-error');
          this.set('invalidEmailErrorMessage', reason.errors);
        });
    },
  },
});
