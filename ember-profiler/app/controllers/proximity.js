import Ember from 'ember';

export default Ember.Controller.extend({
  searchRadius: function() { return 25;}.property(),
  deferredUpdate: function() {this.send("findInProximity");},
  liveUpdateProximity: function() {
    Ember.run.debounce(this, this.deferredUpdate, 150);
  }.observes("searchRadius"),
  actions: {
    findInProximity: function() {
      if (this.get("location")) {

        var that = this;
        this.store.find("college", {proximity: this.get("searchRadius"), location: this.get("location")}).then(function(results) {
            var resultsController = Ember.ArrayController.create({
              content: results,
              sortProperties: ['distance'],
              sortAscending: true
            });
            that.set("proximityResults", resultsController);
          }
        );

      } else {
        this.status.warn("We could not find your current location");
      }
    },
    viewCollege: function(collegeId) {
      this.transitionToRoute("college", collegeId);
    }
  }
});
