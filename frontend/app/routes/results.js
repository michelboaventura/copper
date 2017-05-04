import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  poller: Ember.inject.service(),
  toDelete: [],

  model() {
    return this.store
      .query('job', { public: true }).then((results) => {
        return results.sortBy('created_at').reverse();
      });
  },
  actions: {
    deleteCheckeds(){
      var jobs = this.get('toDelete');
      var store = this.get('store');
      jobs.forEach(function(id) {
        store.findRecord('job', id).then( function(job){
          job.destroyRecord();
        });
      });
      this.get('poller').stopPolling();
      location.reload();
    },
    selectAll(state){
      var jobs = this.get('toDelete');
      if(state){
        this.currentModel.forEach(function(element) {
          Ember.$(`#checkbox-${element.id}`).prop('checked', true);
          jobs.push(element.id);
        });
      } else {
        this.currentModel.forEach(function(element) {
          Ember.$(`#checkbox-${element.id}`).prop('checked', false);

        });
        this.set('toDelete', []);
      }
    },
    wasChecked(jobId, state){
      var jobs = this.get('toDelete');
      if(state){
        jobs.push(jobId);
      } else {
        var index = jobs.indexOf(jobId);
        if (index > -1) {
          jobs.splice(index, 1);
        }
      }
    }
  },
});
