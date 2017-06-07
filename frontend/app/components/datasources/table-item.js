import Ember from 'ember';

const { inject: { service }} = Ember;

export default Ember.Component.extend({
  tagName: 'tr',
  sessionAccount: service(),

  actions: {
    checked(datasourceId){ this.get('wasChecked')(datasourceId, event.currentTarget.checked); },
    deleteDatasource(datasource){
      var confirmText = `Deseja apagar a base de dados ${datasource.get('name')} ?`;
      if(confirm(confirmText)){ datasource.destroyRecord(); }
    },
  },
});
