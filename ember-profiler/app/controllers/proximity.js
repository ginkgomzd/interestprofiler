import Ember from 'ember';

export default Ember.Controller.extend({
  status: Ember.inject.service('status'),
  showBackButton: "ios",
  pageTitle: "Degrees and Colleges",

  onLoad: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var propStop = function(event) {event.stopPropagation();};
      Ember.$("#ProximitySlider").on("touchstart", propStop).on("panstart", propStop).on("panright", propStop).on("touchmove", propStop).on("pan", propStop);
    });
  }.on("init"),
  searchRadius: function() { return 25;}.property(),
  sortProperties: ['distance:asc'],
  results: function() {return [];}.property(),
  proximityResults: Ember.computed.sort("results", "sortProperties"),
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
    var zipCodeSelected = this.get("zipCodeSelected");
    if (zipCodeSelected.length  > 4) {
      Ember.run.debounce(that, that.hideKeyboard, 10000);
    }
    if (zipCodeSelected) {
      this.get("store").findRecord("zipcode", zipCodeSelected).then(function (zipcode) {
        Ember.run.debounce(that, that.hideKeyboard, 2000);
        that.set("locationType", "zip");
        that.set("location", {lat: zipcode.get("lat"), long: zipcode.get("long")});
      });
    }
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
        var query = {proximity: this.get("searchRadius"), location: this.get("location")};
        this.store.query("college", query).then(function(results) {
          that.set("results", results);
          }
        );

      } else {
        this.get("status").warn("We could not find your current location");
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
