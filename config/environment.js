/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'songbox',
    podModulePrefix: 'songbox/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['api'] = {
    host: 'http://localhost:4000',
    namespace: 'api'
  };
  ENV['ws'] = {
    host: 'ws://localhost:4000'
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'auth.login'
  };

  ENV['flashMessageDefaults'] = {
    timeout: 3000,
    extendedTimeout: 375
  };

  ENV['ember-cli-mirage'] = {
  };

  ENV['sentry'] = {
    cdn: 'https://cdn.ravenjs.com/3.8.1/raven.min.js',
    dsn: 'https://f37ac4fa9e884542be19f40d1f0c5231@sentry.io/104448',
    development: environment !== 'production' // enable only in production
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-cli-mirage'].enabled = false;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.api.host = 'https://songbox-api.herokuapp.com';
    ENV.ws.host = 'wss://songbox-api.herokuapp.com';
  }

  return ENV;
};
