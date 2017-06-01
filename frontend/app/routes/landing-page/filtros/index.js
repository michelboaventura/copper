import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin,{
  perPage: 8,

  model() {
    return this.findPaged('job', { public: true })
  },

  setupController(controller, model){
    this._super(controller, model);
    controller.set('page', Ember.computed.alias("model.page"));
    controller.set('perPage', Ember.computed.alias("model.perPage"));
    controller.set('totalPages', Ember.computed.alias("model.totalPages"));
  }
});
