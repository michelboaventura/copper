import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import Ember from 'ember';
import RSVP from 'rsvp';
import config from '../config/environment';

const {
  $: {ajax}
} = Ember;

export default Service.extend({
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
      }).catch(function() {
        var access_token = sessionAccount.get('session.data.authenticated.access_token');
        var serverEndpoint = `${config.mj_data_explorer}/users/sign_out`;
        sessionAccount.get('session').invalidate().then(
          ajax({
            url: serverEndpoint,
            type: "DELETE",
            headers: { "Authorization": `Bearer ${access_token}` },
          })
        );
      });
    }
  }
});
