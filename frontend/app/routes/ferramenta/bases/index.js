import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export const pollInterval = 15000

export default Ember.Route.extend(RouteMixin,{
  perPage: 8,
  toDelete: [],

  beforeModel(){
    this.store.unloadAll('datasource')
  },

  getDatasources() {
    if(this.controller){
      var page = this.controller.get("datasources.page");
    }

    return this.findPaged('datasource', { page: page })
  },

  model(){
    return this.getDatasources()
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('datasources', model);
    controller.set('page', controller.get("datasources.page"));
    controller.set('perPage', controller.get("datasources.perPage"));
    controller.set('totalPages', controller.get("datasources.totalPages"));
  },

  onPoll() {
    return this.getDatasources().then((datasources) => {
      this.controller.set('datasources', datasources);
    })
  },

  afterModel() {
    let datasourcesPoller = this.get('datasourcesPoller');

    if (!datasourcesPoller) {
      datasourcesPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
      this.set('datasourcesPoller', datasourcesPoller);
    } else {
      this.get('pollboy').remove(datasourcesPoller);
      datasourcesPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
      this.set('datasourcesPoller', datasourcesPoller);
    }
  },

  deactivate () {
    const datasourcesPoller = this.get('datasourcesPoller');
    this.get('pollboy').remove(datasourcesPoller);
  },

  actions: {
    didTransition(){

    },
    deleteCheckeds(){
      var datasources = this.get('toDelete');
      var store = this.store;
      var confirmText = `Deseja apagar todas as ${datasources.length} bases?`
      if(confirm(confirmText)){
        datasources.forEach( function(id){
          store.findRecord('datasource', id, { backgroundReload: false })
            .then(function(datasource){ datasource.destroyRecord(); });
        });
      }
    },

    selectAll(state){
      var datasources = this.get('toDelete');
      if(state){
        this.controller.get('datasources').forEach( function(element) {
          Ember.$(`#checkbox-${element.id}`).prop('checked', true);
          datasources.push(element.id);
        });
      } else {
        this.controller.get('datasources').forEach( function(element) {
          Ember.$(`#checkbox-${element.id}`).prop('checked', false);
        });
        this.set('toDelete', []);
      }
    },

    wasChecked(datasourceId, state){
      var datasources = this.get('toDelete');
      if(state){
        datasources.push(datasourceId);
      } else {
        var index = datasources.indexOf(datasourceId);
        if (index > -1) {
          datasources.splice(index, 1);
        }
      }
    }
  },
});

