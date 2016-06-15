import Ember from 'ember';

export default Ember.Component.extend({
  settings: Ember.inject.service('settings'),
  tagName: 'ul',
  classNames: ['oc-drawer'],
  classNameBindings: ['open:oc-drawer-open:oc-drawer-closed'],
  quizPrefix: function() {

    if ((this.get("settings").answers === undefined || this.settings.answers === null) && this.parseAuth.user !== null) {
      this.get("settings").save("answers", this.parseAuth.user.get("answers"));
    }

    if (this.get("settings").answers && this.get("settings").answers.length === 60) {
      return "Retake ";
    }

    if (this.get("settings").answers && this.get("settings").answers.length < 60) {
      return "Resume ";
    }


    return "Take ";
  }.property("settings.answers"),
  hideDrawer: function () {
    this.set("open", false);
    return false;
  },
  showDrawer: function () {
    this.set("open", true);
    return false;
  },
  toggleDrawer: function () {
    this.toggleProperty("open");
  },
  actions: {
    logout: function() {
      this.sendAction("logout");
    }
  },

  regHandler: function() {
    this.set('register-as', this); // register-as is a new property
  }.on('init'),

  captureHardwareMenuButton: function() {
    if(window.cordova && cordova.platformId === "android" && navigator && navigator.app) {
      var that = this;
      //React to the Android Menu button
      navigator.app.overrideButton("menubutton", true);
      document.addEventListener("menubutton", function () {
        that.toggleDrawer();
      }, false);
    }
  }.on("init"),

  setupSwipeToOpen: function() {
    var that = this;

    Ember.$("body").on("touchstart", function(e) {
      if (!Ember.$(e.target).hasClass("disableDrawerSwipe")) {
        that.originX = e.originalEvent.touches[0].clientX;
      } else {
        that.originX = false;
      }
    });

    Ember.$("body").on("touchend", function(e) {
      that.originX = false;
    });

    Ember.$("body").on("touchmove", function(e) {
      if (!Ember.$(e.target).hasClass("disableDrawerSwipe") && that.originX) {

        var deltaX = e.originalEvent.touches[0].clientX - that.originX;

        if (deltaX > 100 && e.originalEvent.touches[0].clientX < 150) {
          that.showDrawer();
          return e.preventDefault();
        }

        if (deltaX < -150) {
          that.hideDrawer();
          return e.preventDefault();
        }

      }
    });
  }.on("init")
});
