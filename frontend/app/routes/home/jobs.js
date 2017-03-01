import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service('current-user'),
  poller: Ember.inject.service(),
  toDelete: [],

  model() {
    return this.store
      .query('job', { user_id: this.get('currentUser').id }).then((results) => {
        return results.sortBy('created_at').reverse();
      });
  },
  actions: {
    deleteCheckeds(){
      var jobs = this.get('toDelete');
      var store = this.get('store');
      jobs.forEach(function(id, index, array) {
        var job = store.findRecord('job', id).then( function(job){;
          job.destroyRecord();
        });
      });
      this.get('poller').stopPolling();
      location.reload();
    },
    selectAll(state){
      var jobs = this.get('toDelete');
      if(state){
        this.currentModel.forEach(function(element, index, array) {
          Ember.$(`#checkbox-${element.id}`).prop('checked', true);
          jobs.push(element.id);
        })
      } else {
        this.currentModel.forEach(function(element, index, array) {
          Ember.$(`#checkbox-${element.id}`).prop('checked', false);

        })
        this.set('toDelete', []);
      }
    },
    wasChecked(jobId, state){
      var jobs = this.get('toDelete');
      if(state){
        jobs.push(jobId)
      } else {
        var index = jobs.indexOf(jobId);
        if (index > -1) {
          jobs.splice(index, 1);
        }
      }
    }
  },
});
