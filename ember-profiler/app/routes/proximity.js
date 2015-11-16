import Ember from 'ember';

export default Ember.Route.extend({
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
      Ember.$("#proximity-zip").removeClass("active");
      Ember.$("#proximity-location").addClass("active");
    }
  }
});
