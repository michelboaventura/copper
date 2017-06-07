import Ember from 'ember';
import RSVP from 'rsvp';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin,{
  perPage: 5,

  model(){
    return RSVP.hash({
      jobsCompleted: this.findPaged('job', { completed: true }),
      jobsRunning: this.findPaged('job', { running: true})
    });
  },
  setupController(controller, model){
     this._super(controller, model);
     controller.set('page', Ember.computed.alias("model.page"));
     controller.set('perPage', Ember.computed.alias("model.perPage"));
     controller.set('totalPages', Ember.computed.alias("model.totalPages"));
   }
});
