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
    staticQuestionData.forEach(function (question) {
      var r = store.createRecord('question', question);
      r.save();
    });
  },
  staticQuestionOptions: function() {
    var store = this.get("store");
    staticQuestionOptionData.forEach(function (option) {
      var r = store.createRecord('questionOption', option);
      r.save();
    });
  },
  staticClusters: function() {
    this.get("store").pushMany('cluster', staticClusterData);
  },
  staticPathways: function() {
    this.get("store").pushMany('pathway', staticPathwayData);
  },
  staticOccupations: function() {
    this.get("store").pushMany('occupation', staticOccupationData);
  },
  staticOnetCareers: function() {
    this.get("store").pushMany('onet-career', staticOnetCareerData);
  },
  staticAlumni: function() {
    this.get("store").pushMany('alumni', staticAlumniData);
  },
  staticPrograms: function() {
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
