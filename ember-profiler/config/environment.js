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
      'default-src': "'self'",
      'script-src': "'self' https://services.onetcenter.org http://beaker.ginkgostreet.com connect.facebook.net about:",
      'font-src': "'self'",
      'connect-src': "'self' https://services.onetcenter.org http://beaker.ginkgostreet.com connect.facebook.net",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'"
    },
    parse: {
      appId: "Fb0w8YZ8IzTKaNtLT7AYNsBNUlR8fAwWKbIvMKwW",
      javascriptKey: "7FubtodqX5Ew0UWZ1YvFCNt6GP7DdYeL0dkJiI4a",
      FacebookAppId: "699449926827946"
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
