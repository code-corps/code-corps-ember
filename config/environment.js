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
    },

    flashMessageDefaults: {
      // flash message defaults
      timeout: 2000,
      extendedTimeout: 0,
      priority: 200,
      sticky: true,
      showProgress: true,

      // service defaults

      // do not inject into factories automatically
      // use Ember.inject.service() explicitly where needed instead
      // since that's the new Ember convention
      injectionFactories: [],
      preventDuplicates: true
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
    };

    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': ["'self'"],
      // Allow fonts to be loaded from http://fonts.gstatic.com
      'font-src': ["'self'", "https://fonts.gstatic.com"],
      // Allow data (ajax/websocket) from api.lvh.me
      'connect-src': ["'self'", "http://api.lvh.me:3000"],
      // Allow images from the origin itself (i.e. current domain), and data
      'img-src': ["'self'", "data:"],
      // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'style-src': ["'self'", "https://fonts.googleapis.com"],
      // `media-src` will be omitted from policy
      // Browser will fallback to default-src for media resources (which is to deny, see above).
      'media-src': null
    }
  }

  if (environment === 'staging') {
    ENV.API_BASE_URL = 'http://api.pbqrpbecf.org';
    ENV.OAUTH_SERVER_TOKEN_ENDPOINT = 'http://api.pbqrpbecf.org/oauth/token/';
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
    };

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'production') {

  }

  return ENV;
};
