import Ember from 'ember';

export default Ember.Controller.extend({
  searchRadius: function() { return 25;}.property(),
  deferredUpdate: function() {this.send("findInProximity");},
  liveUpdateProximity: function() {
    Ember.run.debounce(this, this.deferredUpdate, 150);
  }.observes("searchRadius,location"),
  zipCodeSelected: function() { return "";}.property(),
  hideKeyboard: function() {
    Ember.$("#zipCodeInput").blur();
  },
  updateLocationFromZip: function() {
    var that = this;
    if (this.get("zipCodeSelected").length  > 4) {
      Ember.run.debounce(that, that.hideKeyboard, 10000);
    }
    this.get("store").find("zipcode", this.get("zipCodeSelected")).then(function(zipcode) {
      Ember.run.debounce(that, that.hideKeyboard, 2000);
      that.set("locationType", "zip");
      that.set("location", {lat: zipcode.get("lat"), long: zipcode.get("long")});
    });
  }.observes("zipCodeSelected"),
  registerLocationAnalytics: function() {
    var thisLocation = this.get("location");
    var PS = {};
    PS.latitude = "" + thisLocation.lat;
    PS.longitude = "" + thisLocation.long;
    PS.locationType = this.get("locationType");
    if(this.get("locationType") === "zip") {
      PS.zipcode = this.get("zipCodeSelected");
    }
    this.send("analytics", "proximitySearch", PS);
  }.observes("location"),
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
