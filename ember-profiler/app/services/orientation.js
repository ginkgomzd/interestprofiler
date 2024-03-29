import Ember from 'ember';

var orientationServices = Ember.Service.extend({
  callbacksToFire: [],
  onLoad: function() {
    var that = this;
    var handler = function(event) {
      that.updateOrientation(event);
    };
    window.addEventListener("orientationchange", handler);
    window.addEventListener("resize", handler);
  }.on("init"),

  /**
   * Function to Lock Screen Orientation
   */
  lockOrientation: function(orientation) {
    //Lock screen orientation
    try {
      window.screen.lockOrientation(orientation);
      return true;
    } catch(e) {
      return false;
    }
  },

  /**
   * Function to unlock the Screen orientation
   *
   * @returns {boolean}
   */
  unlockOrientation: function() {
    try {
      window.screen.unlockOrientation();
      return true;
    } catch(e) {
      return false;
    }
  },

  /**
   * This function will be called on both resize and orientation change
   * As far s I know, a resizze event only takes place on a mobile
   * device on orientation change. Or possibly with the new iPad split
   * screen. But I haven't tested that.
   */
  updateOrientation: function(event) {
    for(var x in this.callbacksToFire) {
      if(this.callbacksToFire.hasOwnProperty(x) && this.callbacksToFire[x]) {
        this.callbacksToFire[x].controller.send(this.callbacksToFire[x].action, event);
      }
    }
  },
  /**
   * Used to register intent to react to orientation change.
   */
  registerCallback: function(name, action, controller) {
    this.callbacksToFire[name] = {"controller": controller, "action": action};
  },
  removeCallback: function(name) {
    if(this.callbacksToFire.hasOwnProperty(name)) {
      delete this.callbacksToFire[name];
    }
  }
});

export default orientationServices;