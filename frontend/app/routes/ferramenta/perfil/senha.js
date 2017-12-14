import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import config from '../../../config/environment';

const {
  $: { ajax }
} = Ember;

export default Route.extend({

  session: service(),

  setupController(controller, model) {
    controller.set('oldPassword', null);
    controller.set('newPassword', null);
    controller.set('newPasswordConfirmation', null);
    controller.set('validationError', null);
    this._super(controller, model);
  },


  actions: {
    changePassword(){
      var controller = this.controller;
      controller.set('validationError', null);
      var data = {
        current_password: controller.get('oldPassword'),
        password: controller.get('newPassword'),
        password_confirmation: controller.get('newPasswordConfirmation')
      };
      var me = this;
      ajax({
        beforeSend: function(request) {
          request.setRequestHeader("Authorization", "Bearer " + me.get('session.data.authenticated.access_token'));
        },
        url: `${config.mj_data_explorer}/users/change_password`,
        type: 'POST',
        data: {password: data },
        success() {
          me.transitionTo('ferramenta.perfil');
        },
        error() {
          controller.set('validationError', 'Erro ao mudar a senha, tente novamente.');
        }
      });
    },
  },
});
