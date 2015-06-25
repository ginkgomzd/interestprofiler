/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-profiler',
    environment: environment,
    locationType: 'hash',
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
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' https://services.onetcenter.org http://beaker.ginkgostreet.com",
      'font-src': "'self'",
      'connect-src': "'self' https://services.onetcenter.org http://beaker.ginkgostreet.com",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'"
    }
  };



  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.EmberENV.onetUrl = 'https://ginkgostreet:6584bxz@services.onetcenter.org';
  }

  return ENV;
};
