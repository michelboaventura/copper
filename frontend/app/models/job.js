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
  description: attr(),

  started: attr('dates'),
  finished: attr('dates'),
  status: attr('status'),
  created_at: attr('dates'),
  updated_at: attr('dates'),

  idTruncated: Ember.computed('id', function() {
    return this.get('id').slice(-6);
  }),
  hasCompleted: Ember.computed('status', function() {
    return this.get('status').message === 'COMPLETED';
  }),
  isRunning: Ember.computed('status', function() {
    return this.get('status').message === 'RUNNING';
  }),
  noResult: Ember.computed('status', function() {
    return this.get('status').message === 'EMPTY';
  }),
  hasError: Ember.computed('status', function() {
    return this.get('status').message === 'ERROR';
  }),
});
