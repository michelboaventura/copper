import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(RouteMixin,{
  perPage: 8,

  model() {
    return this.findPaged('job', { public: true })
  },

  setupController(controller, model){
    this._super(controller, model);
    controller.set('page', controller.get("model.page"));
    controller.set('perPage', controller.get("model.perPage"));
    controller.set('totalPages', controller.get("model.totalPages"));
  }
});
