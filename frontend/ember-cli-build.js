/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-font-awesome': {
      useScss: true,
      useLess: false
    },

    // Add options here
  });
  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('vendor/bootstrap/bootstrap.min.js'); //dependencia query-builder
  app.import('vendor/doT/doT.min.js');//dependencia query-builder
  app.import('vendor/jquery-extendext/jQuery.extendext.min.js');//dependencia query-builder
  app.import('vendor/jQuery-QueryBuilder/query-builder.min.js');
  app.import('vendor/jQuery-QueryBuilder/query-builder.default.min.css');
  app.import('vendor/jQuery-QueryBuilder/query-builder.pt-BR.js');
  app.import('vendor/jquery-ui/jquery-ui.css');
  app.import('vendor/jquery-ui/jquery-ui.js');
  app.import('vendor/jquery.doubleScroll.js');

  app.import('vendor/bootstrap-custom/css/bootstrap.min.css'); // Customize bootstrap

  return app.toTree();
};
