import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
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
