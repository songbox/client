/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {
    },
    // deployment
    pagefront: {
      app: 'songbox',
      key: process.env.PAGEFRONT_KEY
    },
    'revision-data': {
      //type: 'git-commit' // does not work on Heroku
    },
    // error monitoring
    sentry: {
      sentryUrl: 'https://sentry.io',
      sentryOrganizationSlug: 'songbox',
      sentryProjectSlug: 'app',
      sentryApiKey: 'unused', // just here because of a bug
      sentryBearerApiKey: process.env.SENTRY_KEY
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV.sentry.publicUrl = 'https://beta.songbox.co';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.sentry.publicUrl = 'https://app.songbox.co';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
