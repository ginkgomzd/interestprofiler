import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
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
    }
    
    this._super();
  }
});