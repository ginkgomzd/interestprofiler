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
  fetchAlumniImage: function(alum) {

  },
  updateAlumniContent: function(lastUpdated) {
    var setup = this;
    var store = this.get("store");
    var url = this.baseUrl() + "/api/alumni?updated=" + lastUpdated;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax(url).then(function (results) {

        results.forEach(function(alum) {
          var r = store.getById("alumni", alum.id);
          if(typeof r === undefined || r === null) {
            r = store.createRecord("alumni", alum);
          } else {
            r.eachAttribute(function(name, meta) {
              if (alum.hasOwnProperty(name)) {
                r.set(name, alum[name]);
              }
            });
          }
          setup.fetchAlumniImage(alum);
          r.save();
        });

        resolve(results);

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
