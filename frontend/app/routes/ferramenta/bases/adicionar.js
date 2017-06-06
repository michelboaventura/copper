import Ember from 'ember';
import config from '../../../config/environment';

const {$: { ajax }, inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),
  sessionAccount: service(),

  actions: {
    create(){
      $('input#user').val(this.get('sessionAccount.id'));
      var form = $('#newDb')[0];
      var formData = new FormData(form);
      var me = this;
      ajax({
        beforeSend: function(request) {
          request.setRequestHeader("Authorization", "Bearer " + me.get('session.data.authenticated.access_token'));
        },
        url: `${config.mj_data_explorer}/datasources`,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success() {
          me.transitionTo('ferramenta.bases');
        },
        error() {
          alert("Erro ao importar database");
        }
      });
    },
  },
});
