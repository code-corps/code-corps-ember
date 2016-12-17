/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'code-corps-ember',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        // Date: false
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

    pageTitle: {
      prepend: true,
      separator: " — "
    },

    sentry: {
      dsn: 'https://cecdf7d399e74b72bc73dc8e4e62737d@app.getsentry.com/82741'
    },

    stripe: {}
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.API_BASE_URL = 'http://api.lvh.me:49235';
    ENV.WEB_BASE_URL = 'http://localhost:4200';

    ENV.sentry.development = true;

    ENV.stripe.publishableKey = 'pk_test_uulykWQvn6axvKzslwN8lqby';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': [
        "'self'",
      ],
      // Allow fonts to be loaded from http://fonts.gstatic.com
      'font-src': ["'self'", "data:", "https://fonts.gstatic.com"],
      // Allow data (ajax/websocket) from api.lvh.me:49235
      'connect-src': [
        "'self'",
        "http://api.lvh.me:49235"
      ],
      // Allow images from the origin itself (i.e. current domain), and data
      'img-src': [
        "'self'",
        "data:",
        "https://d3pgew4wbk2vb1.cloudfront.net",
        "https://dawxes9syhrgg.cloudfront.net",
        "http://lorempixel.com",
        "https://s3.amazonaws.com",
      ],
      // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'style-src': [
        "'self'",
        "'unsafe-inline'",
      ],
      // `media-src` will be omitted from policy
      // Browser will fallback to default-src for media resources (which is to deny, see above).
      'media-src': null
    }
  }

  if (environment === 'remote-development') {
    ENV.API_BASE_URL = 'http://api.pbqrpbecf-qri.org';
    ENV.WEB_BASE_URL = 'http://www.pbqrpbecf-qri.org';

    ENV.sentry.development = true;

    ENV.stripe.publishableKey = 'pk_test_WN9xr9Ly1m0D36bdPQCbAzMi';
  }

  if (environment === 'mirage-development') {
    ENV.API_BASE_URL = '';
    ENV.WEB_BASE_URL = '';

    ENV.sentry.development = true;

    ENV.stripe.publishableKey = 'pk_test_uulykWQvn6axvKzslwN8lqby';

    ENV['ember-cli-mirage'] = {
      enabled: true
    };

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
  }

  if (environment === 'staging') {
    ENV.API_BASE_URL = 'http://api.pbqrpbecf.org';
    ENV.WEB_BASE_URL = 'http://www.pbqrpbecf.org';

    ENV.sentry.dsn = 'https://c494e4250972401e84b74526fdf1182b@app.getsentry.com/82742';

    ENV.stripe.publishableKey = 'pk_test_AjQ9D0wliXnWRXH9d14DIW2E';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.API_BASE_URL = '';
    ENV.WEB_BASE_URL = '';

    ENV.sentry.development = true;

    ENV.stripe.publishableKey = 'pk_test_uulykWQvn6axvKzslwN8lqby';
    ENV.LOG_STRIPE_SERVICE = true,

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'production') {
    ENV.API_BASE_URL = 'https://api.codecorps.org';
    ENV.WEB_BASE_URL = 'http://www.codecorps.org';
    ENV.stripe.publishableKey = 'pk_live_AieoBpMkVudxrwizI0yqwRF8';
  }

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.API_BASE_URL + '/token',
    serverTokenRefreshEndpoint: ENV.API_BASE_URL + '/token/refresh',
    refreshLeeway: 3000, // 5 minutes before expiry
    timeFactor: 1000,
  };

  return ENV;
};
