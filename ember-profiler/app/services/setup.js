import Ember from 'ember';
/*** [  Data is exported from CMS and any changes should be reflected there.  ] ***/
import staticAlumniData from '../data/alumni';
import staticClusterData from '../data/clusters';
import staticOccupationData from '../data/occupations';
import staticOnetCareerData from '../data/onetCareers';
import staticPathwayData from '../data/pathways';
import staticProgramData from '../data/programs';
import staticQuestionData from '../data/questions';
import staticQuestionOptionData from '../data/questionOptions';
import staticMasterData from '../data/master';


var setupService = Ember.Object.extend({
  staticDate: "2015-08-23",
  //store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
  cmsUtils: Ember.inject.service('cmsUtils'),
  checkForUpdates: function() {
    //Calculate the last updated date
    var lastUpdated = this.get("settings").load("lastUpdatedDate");
    if (!lastUpdated) {
      lastUpdated = this.get("staticDate");
    }
    return this.get("cmsUtils").updateAll(lastUpdated);
  },
  staticQuestions: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!setup.localForageData.hasOwnProperty("question")) {
        setup.localForageData.question = {};
        setup.localForageData.question.records = {};
      }
      if (Object.keys(setup.localForageData.question.records).length < staticMasterData.questions) {
        staticQuestionData.forEach(function (question) {
          if(!setup.localForageData.hasOwnProperty("question") || !setup.localForageData.question.records.hasOwnProperty(question.id)) {
            setup.localForageData.question.records[question.id] = question;
          }
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  staticQuestionOptions: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!setup.localForageData.hasOwnProperty("question-option")) {
        setup.localForageData['question-option'] = {};
        setup.localForageData['question-option'].records = {};
      }
      if (Object.keys(setup.localForageData['question-option'].records).length < staticMasterData.questionOptions) {
        staticQuestionOptionData.forEach(function (option) {
          if(!setup.localForageData['question-option'].records.hasOwnProperty(option.id)) {
            setup.localForageData['question-option'].records[option.id] = option;
          }
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  staticClusters: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!setup.localForageData.hasOwnProperty("cluster")) {
        setup.localForageData.cluster = {};
        setup.localForageData.cluster.records = {};
      }
      if (Object.keys(setup.localForageData.cluster.records).length < staticMasterData.clusters) {
        staticClusterData.forEach(function (cluster) {
          if(!setup.localForageData.cluster.records.hasOwnProperty(cluster.id)) {
            setup.localForageData.cluster.records[cluster.id] = cluster;
          }
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  staticPathways: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!setup.localForageData.hasOwnProperty("pathway")) {
        setup.localForageData.pathway = {};
        setup.localForageData.pathway.records = {};
      }
      if (Object.keys(setup.localForageData.pathway.records).length < staticMasterData.pathways) {
        staticPathwayData.forEach(function (pathway) {
          if(!setup.localForageData.pathway.records.hasOwnProperty(pathway.id)) {
            setup.localForageData.pathway.records[pathway.id] = pathway;
          }
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  staticOccupations: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!setup.localForageData.hasOwnProperty("occupation")) {
        setup.localForageData.occupation = {};
        setup.localForageData.occupation.records = {};
      }
      if (Object.keys(setup.localForageData.occupation.records).length < staticMasterData.occupations) {
        staticOccupationData.forEach(function (occupation) {
          if(!setup.localForageData.occupation.records.hasOwnProperty(occupation.id)) {
            setup.localForageData.occupation.records[occupation.id] = occupation;
          }
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  staticOnetCareers: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!setup.localForageData.hasOwnProperty("onet-career")) {
        setup.localForageData['onet-career'] = {};
        setup.localForageData['onet-career'].records = {};
      }
      if (Object.keys(setup.localForageData['onet-career'].records).length < staticMasterData.onetCareers) {
        staticOnetCareerData.forEach(function (career) {
          if(!setup.localForageData['onet-career'].records.hasOwnProperty(career.id)) {
            setup.localForageData['onet-career'].records[career.id] = career;
          }
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  staticAlumni: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!setup.localForageData.hasOwnProperty("alumni")) {
        setup.localForageData.alumni = {};
        setup.localForageData.alumni.records = {};
      }
      if (Object.keys(setup.localForageData.alumni.records).length < staticMasterData.alumni) {
        staticAlumniData.forEach(function (alumni) {
          if(!setup.localForageData.alumni.records.hasOwnProperty(alumni.id)) {
            setup.localForageData.alumni.records[alumni.id] = alumni;
          }
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },

  staticPrograms: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!setup.localForageData.hasOwnProperty("program")) {
        setup.localForageData.program = {};
        setup.localForageData.program.records = {};
      }
      if (Object.keys(setup.localForageData.program.records).length < staticMasterData.programs) {
        staticProgramData.forEach(function (program) {
          if(!setup.localForageData.program.records.hasOwnProperty(program.id)) {
            setup.localForageData.program.records[program.id] = program;
          }
        });

        resolve(true);
      } else {
        resolve(false);
      }
    });
  },

  appStartup: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {

      localforage.keys(function(err, keys) {
        setup.localForageKey = keys[0];
        localforage.getItem(setup.localForageKey, function(err, value) {
          setup.localForageData = value || {};

          var staticPromises = {
            questions: setup.staticQuestions(),
            questionOptions: setup.staticQuestionOptions(),
            clusters: setup.staticClusters(),
            pathways: setup.staticPathways(),
            careers: setup.staticOnetCareers(),
            occupations: setup.staticOccupations(),
            alumni: setup.staticAlumni(),
            programs: setup.staticPrograms()
          };

          Ember.RSVP.hash(staticPromises).then(function() {
            localforage.setItem(setup.localForageKey, setup.localForageData);
            setup.checkForUpdates().then(function() {
              var today = new Date();
              setup.get("settings").save("lastUpdatedDate", today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
              setup.get("profilerDataUtils").marshalSavedAnswers().then(function(updated) {
                resolve();
              });
            });
          });

        });
      });

    });
  }

});

export default setupService;
