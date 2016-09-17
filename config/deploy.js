var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'development-postbuild',
  'staging',
  'production'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'development-postbuild') {
    ENV.build = {
      environment: 'development'
    };
  }

  if (deployTarget === 'staging' || deployTarget === 'production') {
    ENV.s3 = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
    ENV['s3-index'] = {
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
    ENV.s3.bucket = process.env.STAGING_S3_BUCKET;
    ENV.s3.region = process.env.STAGING_S3_REGION;
    ENV['s3-index']['bucket'] = process.env.STAGING_S3_INDEX_BUCKET;
    ENV['s3-index']['region'] = process.env.STAGING_S3_INDEX_REGION;
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.s3.bucket = process.env.PRODUCTION_S3_BUCKET;
    ENV.s3.region = process.env.PRODUCTION_S3_REGION;
    ENV['s3-index']['bucket'] = process.env.PRODUCTION_S3_INDEX_BUCKET;
    ENV['s3-index']['region'] = process.env.PRODUCTION_S3_INDEX_REGION;
  }

  // Note: if you need to build some configuration asynchronously,ou can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
