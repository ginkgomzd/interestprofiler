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
        alumni: {modelName: "alumni", apiPath: "alumni", emberDataNamespace: "H2CAlumni"},
        cluster: {modelName: "cluster", apiPath: "clusters", emberDataNamespace: "H2CCluster"},
        pathway: {modelName: "pathway", apiPath: "pathways", emberDataNamespace: "H2CPathway"},
        occupation: {modelName: "occupation", apiPath: "occupations", emberDataNamespace: "H2COccupation"},
        program: {modelName: "program", apiPath: "programs", emberDataNamespace: "H2CPrograms"},
        college: {modelName: "college", apiPath: "colleges", emberDataNamespace: "H2CColleges"},
        "onet-career": {modelName: "onet-career", apiPath: "onet-careers", emberDataNamespace: "H2COnetCareer"},
        resource: {modelName: "resource", apiPath: "resources", emberDataNamespace: "H2CResources"},

        // These don't really have apiPaths, but we use this entry for namespacing
        setting: {modelName: "setting", apiPath: "", emberDataNamespace: "H2CSetting"},
        question: {modelName: "question", apiPath: "", emberDataNamespace: "H2CQuestions"},
        "question-option": {modelName: "question-option", apiPath: "", emberDataNamespace: "H2CQuestionOptions"},
        hotOrNot: {modelName: "hot-or-not", apiPath: "", emberDataNamespace: "H2CHotOrNot"},
        zipcode: {modelName: "zipcode", apiPath: "", emberDataNamespace: "H2CZipCodes"},
        scoreArea: {modelName: "score-area", apiPath: "", emberDataNamespace: "H2CScoreArea"},
        answer: {modelName: "answer", apiPath: "", emberDataNamespace: "H2CAnswer"}
      },
      databaseVersion: 1.001,
      staticDataUpdatedDate: "2015-11-25"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'self'",
      'script-src': "'self' https://services.onetcenter.org http://*.ginkgostreet.com https://*.ginkgostreet.com https://connect.facebook.net",
      'frame-src': "'self' https://*.facebook.com http://*.facebook.com",
      'font-src': "'self'",
      'connect-src': "'self' blob: https://services.onetcenter.org https://*.ginkgostreet.com http://*.ginkgostreet.com https://connect.facebook.net https://api.parse.com http://api.parse.com",
      'img-src': "'self' http://*.ginkgostreet.com https://*.ginkgostreet.com data:",
      'style-src': "'self' 'unsafe-inline'",
      'media-src': "'self'"
    },
    parse: {
      appId: "hKy3FnB8M27jIHBXZNfX1Lk2QmwoyGOeDon9EPZ3",
      javascriptKey: "1gTcF2FQn6tKP52SbAMForTcsC6yHkn7BHRiqEEx",
      clientKey: "YwRrf7cxtwGoEHSJR5SPLXTuyBHEh1hdaRJUFxIo",
      FacebookAppId: "699449926827946",
      FacebookAppName: "here-career"
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
