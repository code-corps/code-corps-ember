'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let env = EmberApp.env() || 'development';
  let isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

  let fingerprintOptions = {
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

  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      // async, await, etc.
      includePolyfill: true
    },
    'ember-cli-password-strength': {
      bundleZxcvbn: true
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
      extensions: ['js']
    },
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild },

    tests: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,
    hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild
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

  return app.toTree();
};
