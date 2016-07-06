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
    },

    metricsAdapters: [
      {
        name: 'Segment',
        environments: ['development', 'staging'],
        config: {
          key: 'AkZqGsSMgLz15lGhyatw2T0EXnAHfocr'
        }
      },
      {
        name: 'Segment',
        environments: ['production'],
        config: {
          key: 'Nz7hL2eY2yHzuIwUbExfDanbJp2q0IO0'
        }
      },
    ],

    moment: {
      allowEmpty: true // default: false
    },

    pace: {
      // addon-specific options to configure theme
      theme: 'minimal',
      color: 'blue',
    },

    sentry: {
      dsn: 'https://cecdf7d399e74b72bc73dc8e4e62737d@app.getsentry.com/82741'
    },

    typekit: {
      kitId: 'jkb2eqa'
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.API_BASE_URL = 'http://api.codecorps.dev';
    ENV.OAUTH_CLIENT_ID = '549256d8a4ac06c537cefce8399b2e0220b717014c5a442af97d7629de57ca1f';
    ENV.OAUTH_SERVER_TOKEN_ENDPOINT = 'http://api.codecorps.dev/oauth/token/';

    ENV.sentry.development = true;

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': [
        "'self'",
        "http://use.typekit.net",
        "https://use.typekit.net",
      ],
      // Allow fonts to be loaded from http://fonts.gstatic.com
      'font-src': ["'self'", "data:", "https://fonts.gstatic.com"],
      // Allow data (ajax/websocket) from api.codecorps.dev
      'connect-src': [
        "'self'",
        "http://api.codecorps.dev"
      ],
      // Allow images from the origin itself (i.e. current domain), and data
      'img-src': [
        "'self'",
        "data:",
        "https://d3pgew4wbk2vb1.cloudfront.net",
        "https://dawxes9syhrgg.cloudfront.net",
        "http://lorempixel.com",
        "https://s3.amazonaws.com",
        "https://ping.typekit.net",
        "https://p.typekit.net",
      ],
      // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        "https://use.typekit.net"
      ],
      // `media-src` will be omitted from policy
      // Browser will fallback to default-src for media resources (which is to deny, see above).
      'media-src': null
    }
  }

  if (environment === 'remote-development') {
    ENV.API_BASE_URL = 'http://api.pbqrpbecf-qri.org';
    ENV.OAUTH_SERVER_TOKEN_ENDPOINT = 'http://api.pbqrpbecf-qri.org/oauth/token/';

    ENV.sentry.development = true;
  }

  if (environment === 'staging') {
    ENV.API_BASE_URL = 'http://api.pbqrpbecf.org';
    ENV.OAUTH_SERVER_TOKEN_ENDPOINT = 'http://api.pbqrpbecf.org/oauth/token/';

    ENV.sentry.dsn = 'https://c494e4250972401e84b74526fdf1182b@app.getsentry.com/82742';
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

    ENV.sentry.development = true;

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'production') {
    ENV.API_BASE_URL = 'https://api.codecorps.org';
    ENV.OAUTH_SERVER_TOKEN_ENDPOINT = 'https://api.codecorps.org/oauth/token/';
  }

  return ENV;
};
