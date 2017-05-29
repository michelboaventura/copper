import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(){
    return RSVP.hash({
      jobsCompleted: this.store.query('job', { completed: true }),
      jobsRunning: this.store.query('job', { running: true})
    });
  }
});
