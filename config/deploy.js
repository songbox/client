/* eslint-env node */

module.exports = function(deployTarget) {
  var ENV = {
    pipeline: {
      alias: {
        's3-index': { as: ['s3-index-html', 's3-sw-js'] },
      },
    },
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

  ENV['s3-index-html'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1'
  };

  ENV['s3-sw-js'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    filePattern:  'sw.js',
    region: 'eu-west-1'
  };

  ENV['cloudfront'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    objectPaths: ['/', '/index.html']
  };

  ENV['html-manifest'] = {
    filename: 'manifest.appcache',
    prependPath: '',
    excludePaths: ['index.html'],
    includePaths: ['/'],
    network: ['*']
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV.sentry.publicUrl = 'https://beta.songbox.co';
    ENV['s3-index-html'].bucket = 'beta.songbox.co';
    ENV['s3-sw-js'].bucket = 'beta.songbox.co';
    ENV.cloudfront.distribution = 'E12U3HZRAX3PY'
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.sentry.publicUrl = 'https://app.songbox.co';
    ENV['s3-index-html'].bucket = 'app.songbox.co';
    ENV['s3-sw-js'].bucket = 'app.songbox.co';
    ENV.cloudfront.distribution = 'E3MXXT7QS53WJA';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
