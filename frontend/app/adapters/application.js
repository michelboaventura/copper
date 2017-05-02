import DS from 'ember-data';
import Ember from 'ember';
import config from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { String: { pluralize, underscore } } = Ember;

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${config.mj_data_explorer}`,
  authorizer: 'authorizer:oauth2',
  pathForType(type) {
    return pluralize(underscore(type));
  }
});

