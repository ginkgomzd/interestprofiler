import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNameBindings: ["parseAuth.loggedIn:menu-shown:menu-hidden"],
  templateName: 'application',
  didInsertElement: function() {
    this.get("controller").set("drawerSwipeEnabled", true);
    if (window.cordova) {
      Ember.$("body").addClass("platform-" + cordova.platformId);
    } else {
      //Default the styling to that of android
      Ember.$("body").addClass("platform-android");

      //This is for testing ios Specific styles and should be commented out for production
      //Ember.$("body").addClass("platform-ios");
    }



    if(window.cordova && cordova.platformId === "android" && navigator && navigator.app) {
      //Capture android back-button
      var that = this;
      document.addEventListener("backbutton", function (e) {
        //When history is 1 we have no place left to go back, so don't act on it
        //instead call exit.
        if (window.history.length > 1) {
          that.get("controller").send("registerBackButtonClick");
          e.preventDefault();
        } else {
          navigator.app.exitApp();
        }
      }, false);

      //React to the Android Menu button
      navigator.app.overrideButton("menubutton", true);
      document.addEventListener("menubutton", function () {
        that.get("controller").send("toggleDrawer");
      }, false);
    }
  },
  panRight: function(e) {
    if (this.get("controller").get("drawerSwipeEnabled")) {
      if (e.originalEvent.gesture.deltaX > 100) {
        if (e.originalEvent.gesture.pointers[0].pageX < 150) {
          this.get("controller").send("showDrawer");
          return e.preventDefault();
        }
      }
    }
  }
});

