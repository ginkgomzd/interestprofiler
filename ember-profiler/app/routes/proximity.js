import Ember from 'ember';

export default Ember.Route.extend({
  modal: Ember.inject.service('modal'),
  showHelp: function() {
    this.get("modal").alert("Input your zip code or use your location to find colleges near you.");
  }.on("init"),
  model: function () {
    return {
      location: this.getLocation()
    };
  },
  getLocation: function() {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var setLocation;

      setLocation = function (position) {
        that.get("controller").set("locationType", "device");
        that.get("controller").set("location", {lat: position.coords.latitude, long: position.coords.longitude});
        resolve({lat: position.coords.latitude, long: position.coords.longitude});
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation);
      } else {
        resolve(false);
      }

    });
  },
  actions: {
    refreshLocation: function () {
      this.getLocation();
      this.get("controller").hideKeyboard();
      Ember.$("#proximity-zip").removeClass("active");
      Ember.$("#proximity-location").addClass("active");
    }
  }
});
