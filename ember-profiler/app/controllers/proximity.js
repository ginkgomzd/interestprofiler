import Ember from 'ember';

export default Ember.Controller.extend({
  ProximityDistance: function() { return 25;}.property(),
  deferredUpdate: function() {this.send("findInProximity");},
  liveUpdateProximity: function() {
    Ember.run.debounce(this, this.deferredUpdate, 150);
  }.observes("ProximityDistance"),
  actions: {
    findInProximity: function() {
      if (this.get("location")) {

        var that = this;
        this.store.find("college", {proximity: this.get("ProximityDistance"), location: this.get("location")}).then(function(results) {
            var resultsController = Ember.ArrayController.create({
              content: results,
              sortProperties: ['distance'],
              sortAscending: true
            });
            that.set("proximityResults", resultsController);
          }
        );

      } else {
        this.status.warn("We couldn't not find your current location");
      }
    },
    viewCollege: function(collegeId) {
      console.log("Let me take you to college: " + collegeId);
    }
  }
});
