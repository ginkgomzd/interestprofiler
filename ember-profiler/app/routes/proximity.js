import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {
      location: this.getLocation(),
      distances: [75, 10, 25, 50, 100]
    };
  },
  getLocation: function() {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var setLocation;

      setLocation = function (position) {
        that.set("location", {lat: position.coords.latitude, long: position.coords.longitude});
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
    findInProximity: function() {
      console.log(this.get("location"));
      if (this.get("location")) {

        var that = this;
        this.store.find("college", {proximity: Ember.$("#ProximityDistance").val(), location: this.get("location")}).then(function(results) {
            console.log(results);
            that.get("controller").set("proximityResults", results);
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
