import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  store: Ember.inject.service('store'),
  model(){
    this._super(...arguments);
    return RSVP.hash({
      job: {},
      datasources: this.store.findAll('datasource'),
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.controller.set('datasource', null);
  },
  actions: {
    filtrar(data){
      this.get('controller').transitionToRoute('ferramenta.filtros.adicionar', {queryParams: { base: data}
      });
    },

    editar(data){
    console.log(data.get('data_type'));
      this.get('controller').transitionToRoute('ferramenta.bases.editar', 
      {queryParams: 
        { 
          base: data.get('id'), 
        }
      });
    },

    deletar(datasource){
      this.get('store').findRecord('datasource', datasource.get('id')).then(function(model){model.destroyRecord(); });
      $("#flash span").text("The workflow was deleted.").show().parent().fadeIn().delay(2000).fadeOut('slow', function() { $("#flash span").text('') });
    }
  },

});
