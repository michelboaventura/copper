import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  poller: Ember.inject.service(),
  store: Ember.inject.service(),
  toDelete: [],

  beforeModel(){
    this.store.unloadAll('job');
  },

  model(){
    this._super(...arguments);
    return this.store.findAll('job',  { reload: true });
  },

  setupController(controller, model) {
    this._super(controller, model);
    var me = this;
    this.get('poller').startPolling(function() {
      me.get('store').findAll('job',  { reload: true });
    });
  },

  actions: {
    willTransition() {
      this.get('poller').stopPolling();
    },

    deleteCheckeds(){
      var jobs = this.get('toDelete');
      var store = this.get('store');
      jobs.forEach( function(id){
        store.findRecord('job', id, { backgroundReload: false })
          .then(function(job){ job.destroyRecord(); });
      });
    },

    selectAll(state){
      var jobs = this.get('toDelete');
      if(state){
        this.currentModel.forEach( function(element) {
          Ember.$(`#checkbox-${element.id}`).prop('checked', true);
          jobs.push(element.id);
        });
      } else {
        this.currentModel.forEach( function(element) {
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
