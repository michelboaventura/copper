import Ember from 'ember';
import RSVP from 'rsvp';

export const pollInterval = 5000 // time in milliseconds

export default Ember.Route.extend({
  toDelete: [],

  beforeModel(){
    this.store.unloadAll('job');
  },

  getJobs() {
    return RSVP.hash({
      jobsCompleted: this.store.query('job', { completed: true }),
      jobsRunning: this.store.query('job', { running: true })
    });
  },

  model(){
    return this.getJobs()
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('jobs', model);
  },

  onPoll() {
    return this.getJobs().then((jobs) => {
      this.get('currentModel', jobs)
    })
  },

  afterModel() {
    let jobsPoller = this.get('jobsPoller');

    if (!jobsPoller) {
      jobsPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
      this.set('jobsPoller', jobsPoller);
    } else {
      this.get('pollboy').remove(jobsPoller);
      jobsPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
      this.set('jobsPoller', jobsPoller);
    }
  },

  deactivate () {
    const jobsPoller = this.get('jobsPoller')
    this.get('pollboy').remove(jobsPoller)
  },

  actions: {
    willTransition() {
      this.get('deactivate')();
    },

    deleteCheckeds(){
      var jobs = this.get('toDelete');
      var store = this.store;
      jobs.forEach( function(id){
        store.findRecord('job', id, { backgroundReload: false })
          .then(function(job){ job.destroyRecord(); });
      });
    },

    selectAll(state){
      var jobs = this.get('toDelete');
      if(state){
        this.currentModel.jobsCompleted.forEach( function(element) {
          Ember.$(`#checkbox-${element.id}`).prop('checked', true);
          jobs.push(element.id);
        });
      } else {
        this.currentModel.jobsCompleted.forEach( function(element) {
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
