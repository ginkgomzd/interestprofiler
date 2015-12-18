import Ember from 'ember';
import ajax from 'ic-ajax';

var cmsUtils = Ember.Object.extend({
  store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  baseUrl: function() {
    if (EmberENV.cmsUrl) {
      return EmberENV.cmsUrl;
    } else {
      return 'http://here2career.beaker.ginkgostreet.com';
    }
  },

  //This will be used for storing Alumni images offline
  alumniDetails: function(alum) {

  },


  fetchUpdatedContent: function(modelMapping, lastUpdated) {
    var store = this.get("store");
    var thisService = this;
    var url = this.baseUrl() + "/api/" + modelMapping.apiPath + "?updated=" + lastUpdated;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax(url).then(function (results) {
        if(results.length > 0) {
          localforage.getItem(modelMapping.emberDataNamespace, function (err, value) {

            if (!value) {
              value = {};
            }

            if (!value.hasOwnProperty(modelMapping.modelName)) {
              value[modelMapping.modelName] = {records: {}};
            }

            results.forEach(function (item) {
              if (typeof thisService[modelMapping.modelName + "Details"] === "function") {
                thisService[modelMapping.modelName + "Details"](item);
              }
              if (value[modelMapping.modelName].records.hasOwnProperty(item.id)) {
                for (var prop in item) {
                  if (item.hasOwnProperty(prop)) {
                    value[modelMapping.modelName].records[item.id][prop] = item[prop];
                  }
                }
              } else {
                value[modelMapping.modelName].records[item.id] = item;
              }
            });

            localforage.setItem(modelMapping.emberDataNamespace, value).then(function () {
              resolve(results.length);
            });
          });
        } else {
          resolve([]);
        }
      }, function(error) {
        reject(error);
      });
      });
  },
  updateAll: function(lastUpdated) {
    var promises = {
      alumni: this.fetchUpdatedContent(EmberENV.modelPaths.alumni, lastUpdated),
      cluster: this.fetchUpdatedContent(EmberENV.modelPaths.cluster, lastUpdated),
      pathway: this.fetchUpdatedContent(EmberENV.modelPaths.pathway, lastUpdated),
      occupation: this.fetchUpdatedContent(EmberENV.modelPaths.occupation, lastUpdated),
      program: this.fetchUpdatedContent(EmberENV.modelPaths.program, lastUpdated),
      college: this.fetchUpdatedContent(EmberENV.modelPaths.college, lastUpdated),
      resources: this.fetchUpdatedContent(EmberENV.modelPaths.resource, lastUpdated)
    };
    return Ember.RSVP.hash(promises);
  }
});

export default cmsUtils;
