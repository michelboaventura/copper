import Ember from 'ember';
import RSVP from 'rsvp';

var freq = [
  {name: 'Term 1', ocurrency: 451},
  {name: 'Term 2', ocurrency: 378},
  {name: 'Term 3', ocurrency: 151}
];

var preDef = [
  {name: 'Term 1', ocurrency: 69},
  {name: 'Term 2', ocurrency: 48},
  {name: 'Term 3', ocurrency: 21}
];

export default Ember.Route.extend({
  model(params){
    this._super(...arguments);
    return RSVP.hash({
      terms: { frequent: freq , preDefined: preDef},
      workflow: this.get('store').findRecord('workflow', params.id),
      datasources: this.store.findAll('datasource'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controller.set('datasource', null);
    this.controller.set('publicSearch', false);
    this.controller.set('searchName', null);
  },
});
