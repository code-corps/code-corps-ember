/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'code-corps-ember',
    environment: environment,
    baseURL: '/',
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

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.API_BASE_URL = 'http://api.lvh.me:3000';
    ENV.OAUTH_CLIENT_ID = '549256d8a4ac06c537cefce8399b2e0220b717014c5a442af97d7629de57ca1f';
    ENV.OAUTH_SERVER_TOKEN_ENDPOINT = 'http://api.lvh.me:3000/oauth/token/';

    ENV['ember-cli-mirage'] = {
      enabled: false
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.API_BASE_URL = '';
    ENV.OAUTH_SERVER_TOKEN_ENDPOINT = '/oauth/token/';

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    }
  }

  if (environment === 'production') {

  }
  
  return ENV;
};
