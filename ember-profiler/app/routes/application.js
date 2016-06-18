import Ember from 'ember';

export default Ember.Route.extend({
  setupUtils: Ember.inject.service('setup'),
  status: Ember.inject.service('status'),
  settings: Ember.inject.service('settings'),
  modal: Ember.inject.service('modal'),
  parseAuth: Ember.inject.service('parse-auth'),
  showHamburger: true,
  backButtonText: false,
  stillLoading: true,
  isSetup: false,
  //This may need to be updated in the future depending on what we do
  //in regards to pre-loading data
  model: function() {
    if(!this.isSetup) {
      var that = this;
      return this.get("setupUtils").appStartup().then(function() {
        that.isSetup = true;
        that.gotoFirstScreen();
      });
    } else {
      this.gotoFirstScreen();
    }
  },
  gotoFirstScreen: function() {
    var demoSeen = this.get("settings").load("demoSeen");
    if(demoSeen) {
      this.transitionTo("welcome");
    } else {
      this.transitionTo("demo");
    }
  },
  actions: {
    willTransition: function(transition) {
      this.get("status").loading();
      this.send("hideDrawer");
    },
    didTransition: function(transition) {

      Ember.run.scheduleOnce('afterRender', this, function () {
        this.get("status").loadingComplete();
      });



      Ember.run.later(this, function() {
        //This will run MANY times and could cause performance issues
        //Or lead to a lot of bandwidth being used.
        //The client has asked for it, so we are implementing it.
        if (this.controller) {
          this.send("analytics", "pageLoad", this.controller.currentRouteName);
        }

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
        this.controller.set("showHamburger", !showBB);
        if(platformName === "ios") {
          var BBText =  this.controllerFor(this.controller.currentRouteName).get("backButtonText") || 'Back';
          this.controller.set("backButtonText", BBText);
        }

        //Handle Title changes
        var appTitle = activeController.get("pageTitle") || "Here to Career";
        this.controller.set("appTitle", appTitle);

        //Handle color changes
        var navClass = activeController.get("navbarClass") || "darkBlue";
        this.controller.set("navbarClass", navClass);
        if (platformName === "ios" && window.hasOwnProperty("StatusBar")) {
          var statusColors = {
            "yellow": "#f2b328",
            "lightBlue": "#5c7fbe",
            "darkBlue": "#153672"
          };
          if(this.controller.currentRouteName === "welcome") {
            StatusBar.styleBlackTranslucent();
          } else if(statusColors.hasOwnProperty(navClass)) {
            StatusBar.backgroundColorByHexString(statusColors[navClass]);
          } else {
            StatusBar.backgroundColorByHexString("#000");
          }
        }

      }, 5);

      //This is to hide the Splashscreen
      if (this.stillLoading) {
        if (navigator && navigator.splashscreen) {
          setTimeout(function () {
            navigator.splashscreen.hide();

            //Delay the welcome animation until after the splash screen has faded out.
            setTimeout(function () {
              Ember.$("body").removeClass("body-loading");
            }, 1000);
          }, 700);
        } else {
          Ember.$("body").removeClass("body-loading");
        }
        this.stillLoading = false;
      }
    },
    logout: function() {
      this.get("parseAuth").logout();
      this.transitionTo("login");
    },
    hideDrawer: function() {
      this.controller.set('drawerOpen', false);
    },
    showDrawer: function() {
      this.controller.set('drawerOpen', true);
    },
    toggleDrawer: function() {
      this.controller.toggleProperty('drawerOpen');
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

