import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  model: function (params) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.get("store").query("hotOrNot", {hot: true}).then(function(savedAlumni) {
        var savedAlumniIds = [];
        savedAlumni.forEach(function(item) {
          savedAlumniIds.push(item.get("id"));
        });
        that.get("store").query("alumni", {in: savedAlumniIds}).then(function(alumni) {
          resolve(alumni);
        });
      });
    });
  },
  actions: {
    viewAlumni: function(alumniId) {
      this.transitionTo("saved-alumni-detail", alumniId);
    }
  }
});