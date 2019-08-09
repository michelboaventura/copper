import Route from '@ember/routing/route';

export default Route.extend({
  model(params){
    return this.store.findRecord('datasource', params.id);
  },

  setupController(controller, model){
    this._super(controller, model);
    controller.set('dataTypes', ['database']);
    controller.set('dataFormats',  ['json', 'csv'])
  },

  actions: {
    salvar(){
      var datasource = this.currentModel;
      datasource.save().then(() => {
        this.transitionTo('ferramenta.bases');
      });
    }
  }
});
