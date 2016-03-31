import Ember from 'ember';

export default Ember.Route.extend({
  setupUtils: Ember.inject.service('setup'),
  status: Ember.inject.service('status'),
  showHamburger: true,
  backButtonText: false,
  stillLoading: true,
  demoSeen: true,
  model: function () {
    return this.get("setupUtils").appStartup();
  },
  //This may need to be updated in the future depending on what we do
  //in regards to pre-loading data
  beforeModel: function(transition) {
    if(!this.parseAuth.loggedIn) {
      if(this.get("demoSeen") && transition.targetName !== "demo") {
        this.transitionTo("login");
      } else {
        this.set("demoSeen", true);
        this.transitionTo("demo");
      }
    }
  },
  actions: {
    willTransition: function(transition) {
      this.get("status").loading();
    },
    didTransition: function(transition) {
      this.get("status").loadingComplete();

      Ember.run.later(this, function() {
        //This will run MANY times and could cause performance issues
        //Or lead to a lot of bandwidth being used.
        //The client has asked for it, so we are implementing it.
        this.send("analytics", "pageLoad", this.controller.currentRouteName);

        //Handle hide/show or back button and hamburger icon
        var activeController = this.controllerFor(this.controller.currentRouteName);
        var mode =  activeController.get("showBackButton") || 'never';

        var platformName = "web";
        //var platformName = "ios";
        //var platformName = "android";

        if (window.cordova) {
          platformName = cordova.platformId;
        }

        var showBB = (mode === "always" || mode === platformName);
        this.controller.set("showBackButton", showBB);
        if(platformName === "ios") {
          var BBText =  this.controllerFor(this.controller.currentRouteName).get("backButtonText") || 'Back';
          this.controller.set("backButtonText", BBText);
          this.controller.set("showHamburger", !showBB);
        } else {
          this.controller.set("showHamburger", true);
        }

        //Handle Title changes
        var appTitle = activeController.get("pageTitle") || "Here to Career";
        this.controller.set("appTitle", appTitle);

        //Handle color changes
        var navClass = activeController.get("navbarClass") || "darkBlue";
        this.controller.set("navbarClass", navClass);

      }, 5);

      //This is to hide the Splashscreen
      if (this.stillLoading) {
        if (navigator && navigator.splashscreen) {
          setTimeout(function () {
            navigator.splashscreen.hide();
          }, 700);
        }
        this.stillLoading = false;
      }
    },
    logout: function() {
      this.parseAuth.logout();
      this.transitionTo("login");
    },
    hideDrawer: function() {
      this.controller.get('drawer').hideDrawer();
    },
    showDrawer: function() {
      this.controller.get('drawer').showDrawer();
    },
    toggleDrawer: function() {
      this.controller.get('drawer').toggleDrawer();
    },
    disableDrawerSwipe: function() {
      this.controller.set('drawerSwipeEnabled', false);
    },
    enableDrawerSwipe: function() {
      this.controller.set('drawerSwipeEnabled', true);
    },
    explainJobGrowth: function() {
      this.modal.alert("This indicates industry sectors that are a priority focus in the region; these sectors have training program investments.");
    },
    explainSalaryGrowth: function() {
      this.modal.alert("Students with this degree have the highest percent change in salary.");
    },
    registerBackButtonClick: function() {
      this.controllerFor(this.controllerFor("application").get("currentRouteName")).send("executeBackAction");
    },
    executeBackAction: function() {
      window.history.back();
    },
    openExternalLink: function(url) {
      if(url.substring(0,4) !== 'http') {
        url = "http://" + url;
      }
      if (typeof(cordova) !== 'undefined' && cordova.InAppBrowser) {
        cordova.InAppBrowser.open(url,"_system");
      } else {
        window.open(url,"_blank");
      }
    },
    /**
     * This function is used to register analytics.
     * We are encapsulating it so that we have easier
     * access to refactor when analytics are sent in
     * reference to user vs sessions etc.
     *
     * @param type
     * @param data
     */
    analytics: function(type, data) {
      //for reference: new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});
      if(typeof(data) !== "object") {
        data = {"data": data};
      }
      if(Parse && Parse.Analytics) {
        Parse.Analytics.track(type, data);
      }
    }
  }
});

