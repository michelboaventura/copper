import { computed } from '@ember/object';
import DS from 'ember-data';

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

  idTruncated: computed('id', function() {
    return this.get('id').slice(-6);
  }),
  hasCompleted: computed('status', function() {
    return this.get('status').message === 'COMPLETED';
  }),
  isRunning: computed('status', function() {
    return this.get('status').message === 'RUNNING';
  }),
  noResult: computed('status', function() {
    return this.get('status').message === 'EMPTY';
  }),
  hasError: computed('status', function() {
    return this.get('status').message === 'ERROR';
  }),
});
