/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'code-corps-ember',
    environment,
    rootURL: '/',
    locationType: 'router-scroll',
    historySupportMiddleware: true,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    cloudinary: {},

    emberKeyboard: {
      propagation: true
    },

    flashMessageDefaults: {
      timeout: 2000,
      extendedTimeout: 600,
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

    github: {
      scope: 'public_repo,admin:org,user:email'
    },

    i18n: {
      defaultLocale: 'en-US'
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

    stripe: {
      lazyLoad: true
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.API_BASE_URL = 'http://api.lvh.me:4000';
    ENV.SOCKETS_BASE_URL = 'ws://api.lvh.me:4000/socket';
    ENV.WEB_BASE_URL = 'http://localhost:4200';
    ENV.cloudinary.cloud = 'dlfnmtoq1';
    ENV.cloudinary.uploadPreset = 'xjyyogvi';
    ENV.github.appUrl = 'https://github.com/apps/code-corps-local';
    ENV.github.clientId = 'Iv1.86cea3d2991aea7a';
    ENV.github.redirectUri = 'http://localhost:4200/oauth/github';
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
      'font-src': [
        "'self'",
        "data:",
        "https://fonts.gstatic.com",
        "https://d3pgew4wbk2vb1.cloudfront.net",
        "https://dawxes9syhrgg.cloudfront.net"
      ],
      // Allow data (ajax/websocket) from api.lvh.me:4000
      'connect-src': [
        "'self'",
        "http://api.lvh.me:4000"
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
    ENV.SOCKETS_BASE_URL = 'ws://api.pbqrpbecf-qri.org/socket';
    ENV.WEB_BASE_URL = 'http://www.pbqrpbecf-qri.org';
    ENV.cloudinary.cloud = 'dlcthdxrt';
    ENV.cloudinary.uploadPreset = 'gp6mt4v3';
    ENV.github.appUrl = 'https://github.com/apps/code-corps-remote-development';
    ENV.github.clientId = 'Iv1.a7168fece17333e4';
    ENV.github.redirectUri = 'http://www.pbqrpbecf-qri.org/oauth/github';
    ENV.sentry.development = true;
    ENV.stripe.publishableKey = 'pk_test_WN9xr9Ly1m0D36bdPQCbAzMi';
  }

  if (environment === 'mirage-development') {
    ENV.API_BASE_URL = '';
    ENV.SOCKETS_BASE_URL = '';
    ENV.WEB_BASE_URL = '';
    ENV.sentry.development = true;
    ENV.stripe.publishableKey = 'pk_test_uulykWQvn6axvKzslwN8lqby';
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
    ENV.SOCKETS_BASE_URL = '';
  }

  if (environment === 'staging') {
    ENV.API_BASE_URL = 'http://api.pbqrpbecf.org';
    ENV.SOCKETS_BASE_URL = 'ws://api.pbqrpbecf.org/socket';
    ENV.WEB_BASE_URL = 'http://www.pbqrpbecf.org';
    ENV.cloudinary.cloud = 'dlcthdxrt';
    ENV.cloudinary.uploadPreset = 'gp6mt4v3';
    ENV.github.appUrl = 'https://github.com/apps/code-corps-staging';
    ENV.github.clientId = 'Iv1.c12dfe52d1750e83';
    ENV.github.redirectUri = 'http://www.pbqrpbecf.org/oauth/github';
    ENV.sentry.dsn = 'https://c494e4250972401e84b74526fdf1182b@app.getsentry.com/82742';
    ENV.stripe.publishableKey = 'pk_test_AjQ9D0wliXnWRXH9d14DIW2E';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.API_BASE_URL = '';
    ENV.SOCKETS_BASE_URL = '';
    ENV.WEB_BASE_URL = '';

    ENV.sentry.development = true;

    ENV.github.appUrl = 'https://github.com/apps/code-corps-local';
    ENV.stripe.publishableKey = 'pk_test_uulykWQvn6axvKzslwN8lqby';

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'production') {
    ENV.API_BASE_URL = 'https://api.codecorps.org';
    ENV.SOCKETS_BASE_URL = 'wss://api.codecorps.org/socket';
    ENV.WEB_BASE_URL = 'https://www.codecorps.org';
    ENV.cloudinary.cloud = 'dtrnlbt7o';
    ENV.cloudinary.uploadPreset = 'n5zjzoqc';
    ENV.github.appUrl = 'https://github.com/apps/code-corps';
    ENV.github.clientId = 'Iv1.05b69632e460220d';
    ENV.github.redirectUri = 'https://www.codecorps.org/oauth/github';
    ENV.stripe.publishableKey = 'pk_live_AieoBpMkVudxrwizI0yqwRF8';
  }

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.API_BASE_URL + '/token',
    serverTokenRefreshEndpoint: ENV.API_BASE_URL + '/token/refresh',
    refreshLeeway: 300, // 5 minutes before expiry
  };

  return ENV;
};
