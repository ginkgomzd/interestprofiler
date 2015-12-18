import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  model: function (params) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.get("store").find("hotOrNot", {hot: true}).then(function(savedAlumni) {
        var savedAlumniIds = [];
        savedAlumni.forEach(function(item) {
          savedAlumniIds.push(item.get("id"));
        });
        that.get("store").find("alumni", {in: savedAlumniIds}).then(function(alumni) {
          resolve(alumni);
        });
      });
    });
  }
});