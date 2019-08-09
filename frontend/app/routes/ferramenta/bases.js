import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  store: service('store'),
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
      this.get('controller').transitionToRoute('ferramenta.bases.editar', {
        queryParams: {
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
