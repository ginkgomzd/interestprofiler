import Ember from 'ember';

export default Ember.Route.extend({
  setupUtils: Ember.inject.service('setup'),
  status: Ember.inject.service('status'),
  stillLoading: true,
  model: function () {
    return this.get("setupUtils").appStartup();
  },
  //This may need to be updated in the future depending on what we do
  //in regards to pre-loading data
  beforeModel: function() {
    if(!this.parseAuth.loggedIn) {
      this.transitionTo("login");
    }
  },
  actions: {
    willTransition: function(transition) {
      this.get("status").loading();
    },
    didTransition: function(transition) {
      this.get("status").loadingComplete();

      Ember.run.later(this, function() {
        this.controller.set("showBackButton", !this.controllerFor(this.controller.currentRouteName).get("hideBackButton"));
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
      this.modal.alert("Some description about Job Growth");
    },
    explainSalaryGrowth: function() {
      this.modal.alert("Some description about Salary Growth");
    },
    registerBackButtonClick: function() {
      this.controllerFor(this.controllerFor("application").get("currentRouteName")).send("executeBackAction");
    },
    executeBackAction: function() {
      window.history.back();
    }
  }
});

