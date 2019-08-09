import { underscore } from '@ember/string';
import DS from 'ember-data';
import config from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { pluralize } from 'ember-inflector';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${config.mj_data_explorer}`,
  authorizer: 'authorizer:oauth2',
  pathForType(type) {
    return pluralize(underscore(type));
  }
});

