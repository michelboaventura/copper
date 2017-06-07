import Ember from 'ember';
import config from '../../../config/environment';

const {$: { ajax }, inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),
  sessionAccount: service(),

  actions: {
    clearErrors(){
      var file = $('#inputfile');
      var span = $('#inputfile-error');
      if(file.val()){
        span.removeClass('has-error');
        span.text(file.val().split("\\")[2]);
      }
    },

    create(){
      $('input#user').val(this.get('sessionAccount.id'));
      if(!($('#inputfile').val())){
        $('#inputfile-error').addClass('has-error');
        return;
      }
      $('#myModal').modal('toggle');
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
          $('#myModal').modal('toggle');
          me.transitionTo('ferramenta.bases');
        },
        error(error) {
          $('#myModal').modal('toggle');
          var apiErrors = error.responseJSON.errors;
          alert(`${apiErrors[0].title} \n\n ${apiErrors[0].detail}`);
        }
      });
    },
  },
});
