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
      },
      modelPaths: {
        alumni: {modelName: "alumni", apiPath: "alumni", namespace: "H2CAlumni"},
        clusters: {modelName: "cluster", apiPath: "clusters", namespace: "H2CMain"},
        pathways: {modelName: "pathway", apiPath: "pathways", namespace: "H2CMain"},
        occupations: {modelName: "occupation", apiPath: "occupations", namespace: "H2COccupation"},
        programs: {modelName: "program", apiPath: "programs", namespace: "H2CPrograms"},
        colleges: {modelName: "college", apiPath: "colleges", namespace: "H2CColleges"},
        onetCareers: {modelName: "onet-career", apiPath: "onet-careers", namespace: "H2COnetCareer"}
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'self'",
      'script-src': "'self' https://services.onetcenter.org *.ginkgostreet.com connect.facebook.net",
      'frame-src': "'self' *.facebook.com",
      'font-src': "'self'",
      'connect-src': "'self' blob: https://services.onetcenter.org *.ginkgostreet.com connect.facebook.net api.parse.com",
      'img-src': "'self' *.ginkgostreet.com data:",
      'style-src': "'self' 'unsafe-inline'",
      'media-src': "'self'"
    },
    parse: {
      appId: "hKy3FnB8M27jIHBXZNfX1Lk2QmwoyGOeDon9EPZ3",
      javascriptKey: "1gTcF2FQn6tKP52SbAMForTcsC6yHkn7BHRiqEEx",
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
