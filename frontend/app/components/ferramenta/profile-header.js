import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import config from '../../config/environment';

const {
  $: { ajax }
} = Ember;

export default Component.extend({
  session: service(),
  sessionAccount: service(),

  serverTokenEndpoint: `${config.mj_data_explorer}/users/sign_out`,

  didInsertElement(){
    var linkListContainer = document.querySelector('.link-list-wrapper');
    var linkListActionButton = document.querySelector('.link-list__action');

    linkListActionButton.addEventListener('click', function () {
      if (linkListContainer.classList.contains('is-open')) {
        linkListContainer.classList.remove('is-open');
      } else {
        linkListContainer.classList.add('is-open');
      }
    });
  },

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
