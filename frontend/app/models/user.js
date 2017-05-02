import DS from 'ember-data';

export default DS.Model.extend({
  jobs: DS.hasMany('job'),
  datasources: DS.hasMany('datasource'),

  firstname: DS.attr(),
  lastname: DS.attr(),
  email: DS.attr(),
  fullname: DS.attr(),
});
