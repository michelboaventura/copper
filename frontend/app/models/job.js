import DS from 'ember-data';
import Ember from 'ember';

const { attr } = DS;

export default DS.Model.extend({
  user:  DS.belongsTo('user'),
  datasource: DS.belongsTo('datasource'),

  name: attr('string'),
  filter: attr(),
  mongo_query: attr(),
  public: attr(),

  started: attr('dates'),
  finished: attr('dates'),
  status: attr('status'),
  created_at: attr('dates'),
  updated_at: attr('dates'),

  hasCompleted: Ember.computed('status', function() {
    return this.get('status').message === 'COMPLETED';
  })

});
