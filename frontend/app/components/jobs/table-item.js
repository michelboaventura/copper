import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  sessionAccount: Ember.inject.service(),

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
