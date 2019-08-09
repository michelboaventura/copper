import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'tr',
  sessionAccount: service(),

  actions: {
    togglePublic(){
      this.toggleProperty('job.public');
      this.get('job').save();
    },
    checked(jobId){ this.get('wasChecked')(jobId, event.currentTarget.checked); },
    deleteWorkflow(workflow){
      var confirmText = `Delete workflow ${workflow.get('name')} ?`;
      if(confirm(confirmText)){ workflow.destroyRecord(); }
    },
  },
});
