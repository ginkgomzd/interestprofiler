import Ember from 'ember';

export default Ember.Route.extend({
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
  model: function() {

    if (this.get("profilerDataUtils").dirtyAnswers()) {
      var that = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
        that.get("profilerDataUtils").updateAllResults().then(function() {
          that.store.findAll('scoreArea').then(function(models) {
            resolve(models);
          });
        }, function() {
          that.get("status").error("We were unable to fetch your results at this time", "Network Error");
          that.store.findAll('scoreArea').then(function(models) {
            resolve(models);
          });
        });
      });
    }

    return this.store.findAll('scoreArea');
  }
});

