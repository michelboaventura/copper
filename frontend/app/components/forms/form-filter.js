import $ from 'jquery';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import RSVP from 'rsvp';

var qbJson = {
  filters: [{
    id: 'text',
    label: 'Term',
    type: 'string',
    operators: ['contains', 'equal', 'not_equal']
  }],
  default_filter: 'text',
  lang_code: 'pt-BR',
  icons:{
    add_group: 'anchor-button__icon fa fa-plus',
    add_rule: 'anchor-button__icon fa fa-plus',
    remove_group: 'anchor-button__icon fa fa-trash-o',
    remove_rule: 'anchor-button__icon fa fa-trash-o',
    error: 'anchor-button__icon fa fa-exclamation-triangle'
  }
};

export default Component.extend({
  routing: service('-routing'),
  sessionAccount: service(),
  store: service(),

  didInsertElement() {
    $(`#${this.elementId} .filter`).queryBuilder(qbJson);
  },

  actions: {
    onSearch() {
      if(!this.get('job.name')) {
        alert("Por favor preencha um nome para a Busca");
        return;
      } else if(!this.get('job.datasource')){
        alert("Por favor selecione uma base de dados");
        return;
      }

      var component = this;
      var expression = $(`#${this.elementId} .filter`).queryBuilder('getRules');
      var mongo_query = $(`#${this.elementId} .filter`).queryBuilder('getMongo');
      let job = this.get('job');

      job.filter = expression;
      job.mongo_query = mongo_query;
      var db = component.get('store').findRecord('datasource', component.get('job.datasource'));
      var user = component.get('store').findRecord('user', component.get('sessionAccount.id'));
      RSVP.all([db, user]).then(function() {
        job.datasource = db;
        job.user = user;
        component.get('store').createRecord('job', job).save().then(function(){
          component.get("routing").transitionTo('ferramenta.filtros.index');
        });
      });
    }
  }
});
