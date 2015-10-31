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
        localforage.getItem(modelMapping.namespace, function(err, value) {
          if(!value.hasOwnProperty(modelMapping.modelName)) {
            console.log("Model missing: " + modelMapping.modelName);
            return reject("Missing Model");
          }

          results.forEach(function (item) {
            if (typeof thisService[modelMapping.modelName + "Details"] === "function") {
              thisService[modelMapping.modelName + "Details"](item);
            }
            if(value[modelMapping.modelName].records.hasOwnProperty(item.id)) {
              for(var prop in item) {
                if (item.hasOwnProperty(prop)) {
                  value[modelMapping.modelName].records[item.id][prop] = item[prop];
                }
              }
            } else {
              value[modelMapping.modelName].records[item.id] = item;
            }

          });

          localforage.setItem(modelMapping.namespace, value).then(function() {
            resolve(results.length);
          });
        });
      }, function(error) {
        reject(error);
      });
      });
  },
  updateAll: function(lastUpdated) {
    var promises = {
      alumni: this.fetchUpdatedContent(EmberENV.modelPaths.alumni, lastUpdated),
      clusters: this.fetchUpdatedContent(EmberENV.modelPaths.clusters, lastUpdated),
      pathways: this.fetchUpdatedContent(EmberENV.modelPaths.pathways, lastUpdated),
      occupations: this.fetchUpdatedContent(EmberENV.modelPaths.occupations, lastUpdated),
      programs: this.fetchUpdatedContent(EmberENV.modelPaths.programs, lastUpdated),
      colleges: this.fetchUpdatedContent(EmberENV.modelPaths.colleges, lastUpdated)
    };
    return Ember.RSVP.hash(promises);
  }
});

export default cmsUtils;
