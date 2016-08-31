var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'development-postbuild',
  'staging',
  'production'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    redis: {
      allowOverwrite: true,
      keyPrefix: 'code-corps-ember:index'
    },
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'development-postbuild') {
    // ENV.plugins = ['redis'];

    ENV.build = {
      environment: 'development'
    };

    // ENV.redis = {
    //   keyPrefix: 'code-corps-ember:index',
    //   revisionKey: '__development__',
    //   allowOverwrite: true,
    //   host: 'api.lvh.me', // modified for Docker setup
    //   port: 6380, // modified for Docker setup
    //   distDir: function(context) {
    //     return context.commandOptions.buildDir;
    //   }
    // };
  }

  if (deployTarget === 'staging' || deployTarget === 'production') {
    ENV.s3 = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
    ENV.slack = {
      webhookURL: 'https://hooks.slack.com/services/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',
      username: 'ember-cli-deploy',
      iconEmoji: ':rocket:',
    }
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'staging';
    ENV.redis.url = process.env.STAGING_REDIS_URL;
    ENV.s3.bucket = process.env.STAGING_S3_BUCKET;
    ENV.s3.region = process.env.STAGING_S3_REGION;
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.redis.url = process.env.PRODUCTION_REDIS_URL;
    ENV.s3.bucket = process.env.PRODUCTION_S3_BUCKET;
    ENV.s3.region = process.env.PRODUCTION_S3_REGION;
  }

  // Note: if you need to build some configuration asynchronously,ou can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
