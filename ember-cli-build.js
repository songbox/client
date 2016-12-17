/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    autoprefixer: {
    },
    babel: {
      includePolyfill: true
    },
    sassOptions: {
      includePaths: [
      ]
    },
    sourcemaps: {
      enabled: true, // enable also in production
      extensions: ['js']
    },
    svgJar: {
      strategy: ['inline'],
      sourceDirs: [
        'vendor/icons'
      ]
    }
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

  if (!process.env.EMBER_CLI_FASTBOOT) {
    // This will only be included in the browser build

    // no rubber band scrolling on mobile
    app.import('bower_components/inobounce/inobounce.js');
  }

  return app.toTree();
};
