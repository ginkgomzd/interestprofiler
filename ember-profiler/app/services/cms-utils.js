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
  updateAlumniContent: function(lastUpdated) {
    var url = this.baseUrl() + "/api/alumni?updated=" + lastUpdated;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax(url).then(function (result) {
        //This is wrapped in a promise in case we want to insert it directly
        //before resolving the promise. If we decide we don't care, and want
        //to insert elsewhere, we can return the ajax promise directly.
        resolve(result);

      }, function(error) {
        reject(error);
      });
    });
  },
  updateAll: function(lastUpdated) {
    var promises = {
      alumni: this.updateAlumniContent(lastUpdated)
    };
    return Ember.RSVP.hash(promises);
  }
});

export default cmsUtils;
