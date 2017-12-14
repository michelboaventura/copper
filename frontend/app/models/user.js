import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  jobs: DS.hasMany('job'),
  datasources: DS.hasMany('datasource'),

  firstname: DS.attr(),
  lastname: DS.attr(),
  email: DS.attr(),
  fullname: computed('firstname', 'lastname', function() {
    return `${this.get('firstname')} ${this.get('lastname')}`;
  }),

  password: DS.attr(),
  passwordConfirmation: DS.attr()

});
