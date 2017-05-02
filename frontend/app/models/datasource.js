import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  user:  DS.belongsTo('user'),
  jobs: DS.hasMany('job'),

  name: attr('string'),
  description: attr('string'),
  data_type: attr('string'),
  data_format: attr('string'),
  size: attr('string'),

  created_at: attr('dates'),
  updated_at: attr('dates')
});
