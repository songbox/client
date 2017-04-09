/* eslint-env node */

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
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
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

  ENV['fastboot'] = {
    hostWhitelist: ['app.songbox.co', 'songbox-app.herokuapp.com', /^localhost:\d+$/]
  };

  ENV['ember-simple-auth'] = {
  };

  ENV['flashMessageDefaults'] = {
    timeout: 3000,
    extendedTimeout: 375
  };

  ENV['ember-form-for'] = {
    errorsPath: 'error.PROPERTY_NAME.validation',
    buttonClasses: ['button', 'form-button'],
//  fieldClasses: ['form-field'],
//  fieldErrorClass: 'form-field--has-errors',
//  errorClasses: ['form-field--errors'],
//  hintClasses: ['form-field--hint'],
//  inputClasses: ['form-field--control'],
//  labelClasses: ['form-field--label'],
//  resetClasses: ['form-button--reset'],
    submitClasses: ['button', 'form-button--submit']
  };

  ENV['ember-cli-mirage'] = {
  };

  ENV['EmberHammertime'] = {
    //touchActionSelectors: ['button', 'input', 'a', 'textarea'],
    //touchActionProperties: 'touch-action: manipulation; -ms-touch-action: manipulation; cursor: pointer;'
  };

  ENV['html-manifest'] = {
    filename: 'manifest.appcache',
    prependPath: '',
    excludePaths: ['index.html'],
    includePaths: ['/'],
    network: ['*']
  };

  ENV['sentry'] = {
    // disable for now
    //cdn: 'https://cdn.ravenjs.com/3.9.2/raven.min.js',
    dsn: 'https://f37ac4fa9e884542be19f40d1f0c5231@sentry.io/104448',
    debug: false,
    development: environment !== 'production', // enable only in production
    serviceName: 'sentry',
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
    ENV.api.host = 'https://api.songbox.co';
    ENV.ws.host = 'wss://api.songbox.co';
  }

  return ENV;
};
