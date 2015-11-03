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
import expectedEntityCounts from '../data/entities';
import staticCollegeData from '../data/colleges';


var setupService = Ember.Object.extend({
  staticDate: "2015-10-17",
  store: Ember.inject.service('store'),
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
  clusterDefaults: function(item) {
    item.is_selected = false;
  },
  "onet-careerDefaults": function(item) {
    item.score = 0;
  },
  loadStaticDataForModel: function(modelInfo, staticData) {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      localforage.getItem(modelInfo.namespace, function(err, value) {
        if (!value) {
          value = {};
          value[modelInfo.modelName] = {};
          value[modelInfo.modelName].records = {};
        }
        if (Object.keys(value[modelInfo.modelName].records).length < expectedEntityCounts[modelInfo.modelName]) {
          staticData.forEach(function (item) {
            if (!value[modelInfo.modelName].records.hasOwnProperty(item.id)) {
              if (typeof setup[modelInfo.modelName + "Defaults"] === "function") {
                setup[modelInfo.modelName + "Defaults"](item);
              }
              value[modelInfo.modelName].records[item.id] = item;
            }
          });
          localforage.setItem(modelInfo.namespace, value).then(function() {
            resolve(true);
          });
        } else {
          resolve(false);
        }
      });
    });
  },
  handleLogin: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setup.get("profilerDataUtils").marshalSavedAnswers().then(function (updated) {
        setup.get("store").findAll("onet-career");
        setup.get("store").findAll("cluster");
        setup.get("store").findAll("pathway");
        resolve();
      });
    });
  },
  appStartup: function() {
    var setup = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {

      localforage.getItem("H2CMain", function(err, value) {
        setup.localForageData = value || {};

        var staticPromises = {
          question: setup.loadStaticDataForModel(EmberENV.modelPaths.question, staticQuestionData),
          questionOption: setup.loadStaticDataForModel(EmberENV.modelPaths["question-option"], staticQuestionOptionData),
          cluster: setup.loadStaticDataForModel(EmberENV.modelPaths.cluster, staticClusterData),
          pathway: setup.loadStaticDataForModel(EmberENV.modelPaths.pathway, staticPathwayData),
          onetCareer: setup.loadStaticDataForModel(EmberENV.modelPaths["onet-career"], staticOnetCareerData),
          occupation: setup.loadStaticDataForModel(EmberENV.modelPaths.occupation, staticOccupationData),
          alumni: setup.loadStaticDataForModel(EmberENV.modelPaths.alumni, staticAlumniData),
          college: setup.loadStaticDataForModel(EmberENV.modelPaths.college, staticCollegeData),
          program: setup.loadStaticDataForModel(EmberENV.modelPaths.program, staticProgramData)
        };

        Ember.RSVP.hash(staticPromises).then(function() {
          localforage.setItem("H2CMain", setup.localForageData).then(function() {
            setup.checkForUpdates().then(function() {
              var today = new Date();
              setup.get("settings").save("lastUpdatedDate", today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
              setup.get("profilerDataUtils").marshalSavedAnswers().then(function(updated) {
                setup.get("store").findAll("onet-career");
                setup.get("store").findAll("cluster");
                setup.get("store").findAll("pathway");
                resolve();
              });
            }, function() {
              setup.get("profilerDataUtils").marshalSavedAnswers().then(function(updated) {
                setup.get("store").findAll("onet-career");
                setup.get("store").findAll("cluster");
                setup.get("store").findAll("pathway");
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
