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
  store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
  cmsUtils: Ember.inject.service('cmsUtils'),
  checkForUpdates: function() {
    //Calculate the last updated date
    var lastUpdated = this.get("settings").get("lastUpdatedDate");
    if (!lastUpdated) {
      lastUpdated = this.get("staticDate");
    }
    return this.get("cmsUtils").updateAll(lastUpdated);
  },
  staticQuestions: function() {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.findAll("question").then(function(data) {
        if (data.length >= staticMasterData.questions) {
          staticQuestionData.forEach(function (question) {
            var r = store.createRecord('question', question);
            r.save();
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  staticQuestionOptions: function() {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.findAll("questionOption").then(function(data) {
        if (data.length >= staticMasterData.questionOptions) {
          staticQuestionOptionData.forEach(function (option) {
            var r = store.createRecord('questionOption', option);
            r.save();
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  staticClusters: function() {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.findAll("cluster").then(function(data) {
        if (data.length >= staticMasterData.clusters) {
          staticClusterData.forEach(function (cluster) {
            var r = store.createRecord('cluster', cluster);
            r.save();
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  staticPathways: function() {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.findAll("pathway").then(function(data) {
        if (data.length >= staticMasterData.pathways) {
          staticPathwayData.forEach(function (pathway) {
            pathway.cluster = store.getById("cluster", pathway.cluster);
            var r = store.createRecord('pathway', pathway);
            r.save();
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  staticOccupations: function() {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.findAll("occupation").then(function(data) {
        if (data.length >= staticMasterData.occupations) {
          staticOccupationData.forEach(function (occupation) {
            occupation.pathway = store.getById("pathway", occupation.pathway);
            var r = store.createRecord('occupation', occupation);
            r.save();
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  staticOnetCareers: function() {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.findAll("onet-career").then(function(data) {
        if (data.length >= staticMasterData.onetCareers) {
          staticOnetCareerData.forEach(function (career) {
            career.pathway = store.getById("pathway", career.pathway);
            var r = store.createRecord('onet-career', career);
            r.save();
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  staticAlumni: function() {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.findAll("alumni").then(function(data) {
        if (data.length >= staticMasterData.alumni) {
          staticAlumniData.forEach(function (alumni) {
            var r = store.createRecord('alumni', alumni);
            r.save();
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },

  staticPrograms: function() {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.findAll("program").then(function(data) {
        if (data.length >= staticMasterData.programs) {
          staticProgramData.forEach(function (program) {
            var occupations = [];
            program.occupation.forEach(function (item) {
              occupations.push(store.getById("occupation", item));
            });
            program.occupation = occupations;
            var r = store.createRecord('program', program);
            r.save();
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    //this.get("store").pushMany('program', staticProgramData);
  },

  appStartup: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {

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
        setup.checkForUpdates().then(function() {
          var today = new Date();
          setup.get("settings").set("lastUpdatedDate", today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
          setup.get("profilerDataUtils").marshalSavedAnswers();
          resolve();
        });
      });
    });
  }

});

export default setupService;
