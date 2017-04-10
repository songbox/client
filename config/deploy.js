/* eslint-env node */

module.exports = function(deployTarget) {
  var ENV = {
  };

  ENV['build'] = {
  };

  ENV['revision-data'] = {
    type: 'version-commit'
  };

  ENV['sentry'] = {
    sentryUrl: 'https://sentry.io',
    sentryOrganizationSlug: 'songbox',
    sentryProjectSlug: 'app',
    sentryApiKey: 'unused', // just here because of a bug
    sentryBearerApiKey: process.env.SENTRY_KEY
  };

  ENV['s3'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'cdn.songbox.co',
    region: 'eu-west-1',
    prefix: deployTarget
  };

  ENV['s3-index'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1'
  };

  ENV['cloudfront'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    distribution: process.env.AWS_CLOUDFRONT_DISTRIBUTION,
    objectPaths: ['/', '/index.html']
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV.sentry.publicUrl = 'https://beta.songbox.co';
    ENV['s3-index'].bucket = 'beta.songbox.co';
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.sentry.publicUrl = 'https://app.songbox.co';
    ENV['s3-index'].bucket = 'app.songbox.co';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
