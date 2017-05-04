import Ember from 'ember';
import RSVP from 'rsvp';

const { inject: { service }, isEmpty} = Ember;

export default Ember.Service.extend({
  session: service(),
  store: service(),


  init(){
    var sessionAccount = this;
    if (sessionAccount.get('session.isAuthenticated')) {
      var obj = sessionAccount.get('session.data.authenticated.data');
      Object.keys(obj).forEach(function (key) {
        if(!isEmpty(key)){ sessionAccount.set(key, obj[key]); }
      });
    }
  },

  loadCurrentUser() {

    var sessionAccount = this;

    if (sessionAccount.get('session.isAuthenticated')) {
      var obj = sessionAccount.get('session.data.authenticated.data');
      var user = sessionAccount.get('store').findRecord('user', sessionAccount.get('id'));
      RSVP.all([user]).then(function() {
        Object.keys(obj).forEach(function (key) {
          if(!isEmpty(key)){ sessionAccount.set(key, user.get(key)); }
        });
      });
    }
  }
});
