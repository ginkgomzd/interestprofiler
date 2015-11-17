import Ember from 'ember';

export default Ember.Controller.extend({
  searchRadius: function() { return 25;}.property(),
  deferredUpdate: function() {this.send("findInProximity");},
  liveUpdateProximity: function() {
    Ember.run.debounce(this, this.deferredUpdate, 150);
  }.observes("searchRadius,location"),
  zipCodeSelected: function() { return "";}.property(),
  updateLocationFromZip: function() {
    var that = this;
    this.get("store").find("zipcode", this.get("zipCodeSelected")).then(function(zipcode) {
      console.log({lat: zipcode.get("lat"), long: zipcode.get("long")});
      that.set("location", {lat: zipcode.get("lat"), long: zipcode.get("long")});
    });
  }.observes("zipCodeSelected"),
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
    },
    zipLocation: function() {
      Ember.$("#proximity-location").removeClass("active");
      Ember.$("#proximity-zip").addClass("active");
      this.updateLocationFromZip();
    }
  }
});
