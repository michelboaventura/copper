import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  sessionAccount: service(),

  actions: {
    authenticate(){
      this.set('emailErrorMessage', null);
      this.set('passwordErrorMessage', null);

      let { email, password } = this.getProperties('email','password');

      this.get('session').authenticate('authenticator:oauth2', email, password).then(() => {
          this.get('sessionAccount').loadCurrentUser();
        }).catch((reason)=>{
          if(reason.errors){
            this.set('emailErrorMessage', reason.errors[0].detail || reason);
            this.set('passwordErrorMessage', reason.errors[1].detail || reason);
          }
        });
    },
  },
});

