import Ember from 'ember';
import config from '../../config/environment';

const { inject: { service }, $: { ajax } } = Ember;

export default Ember.Component.extend({
  session: service(),
  serverTokenEndpoint: `${config.mj_data_explorer}/users/sign_out`,

  actions: {
    invalidateSession(){
      var serverEndpoint = this.get('serverTokenEndpoint');
      var access_token = this.get('session.data.authenticated.access_token');

      this.get('session').invalidate().then(
        ajax({
          url: serverEndpoint,
          type: "DELETE",
          headers: { "Authorization": `Bearer ${access_token}` },
        })
      );

    },
  },
});