import { alias } from '@ember/object/computed';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(RouteMixin,{
  perPage: 5,

  model(){
    return RSVP.hash({
      jobsCompleted: this.findPaged('job', { completed: true }),
      jobsRunning: this.findPaged('job', { running: true})
    });
  },
  setupController(controller, model){
     this._super(controller, model);
     controller.set('page', alias("model.page"));
     controller.set('perPage', alias("model.perPage"));
     controller.set('totalPages', alias("model.totalPages"));
   }
});
