import Ember from 'ember';

export default Ember.Component.extend({
  sortedModel: Ember.computed.sort('model', 'sortDefinition'),
  sortDefinition: ['created_at:desc'],
});
