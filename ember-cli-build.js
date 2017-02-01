/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var env = EmberApp.env() || 'development';
  var isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

  var fingerprintOptions = {
    enabled: true,
    extensions: ['js', 'css', 'png', 'jpg', 'gif']
  };

  switch (env) {
    case 'development':
      fingerprintOptions.prepend = 'http://localhost:4200/';
    break;
    case 'staging':
      fingerprintOptions.prepend = 'https://d3onq9263d8on4.cloudfront.net/';
    break;
    case 'production':
      fingerprintOptions.prepend = 'https://d3pgew4wbk2vb1.cloudfront.net/';
    break;
  }

  var app = new EmberApp(defaults, {
    'ember-cli-babel': {
      // async, await, etc.
      includePolyfill: true
    },
    fingerprint: fingerprintOptions,
    emberCLIDeploy: {
      // runOnPostBuild: (env === 'development') ? 'development-postbuild' : false,
      // shouldActivate: true
    },
    sourcemaps: {
      // To see errors in Sentry, this is needed;
      // Our app is open source, so deal with it.
      enabled: true,
      extensions: ['js'],
    },
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild },

    tests: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,
    hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild
  });

  return app.toTree();
};
