/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
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
  app.import('vendor/font-awesome/FontAwesome.otf', {destDir: 'fonts'});
  app.import('vendor/font-awesome/fontawesome-webfont.eot', {destDir: 'fonts'});
  app.import('vendor/font-awesome/fontawesome-webfont.svg', {destDir: 'fonts'});
  app.import('vendor/font-awesome/fontawesome-webfont.ttf', {destDir: 'fonts'});
  app.import('vendor/font-awesome/fontawesome-webfont.woff', {destDir: 'fonts'});
  app.import('vendor/font-awesome/fontawesome-webfont.woff2', {destDir: 'fonts'});
  app.import('vendor/font-awesome/font-awesome.min.css');

  app.import('vendor/bootstrap/bootstrap.min.js'); //dependencia query-builder
  app.import('vendor/doT/doT.min.js');//dependencia query-builder
  app.import('vendor/jquery-extendext/jQuery.extendext.min.js');//dependencia query-builder
  app.import('vendor/jQuery-QueryBuilder/query-builder.min.js');
  app.import('vendor/jQuery-QueryBuilder/query-builder.default.min.css');
  app.import('vendor/jQuery-QueryBuilder/query-builder.pt-BR.js');
  app.import('vendor/jquery-ui/jquery-ui.css');
  app.import('vendor/jquery-ui/jquery-ui.js');
  app.import('vendor/bootstrap-custom/js/bootstrap.min.js'); // Customize bootstrap
  app.import('vendor/bootstrap-custom/css/bootstrap.min.css'); // Customize bootstrap

  return app.toTree();
};
