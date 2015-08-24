import Ember from 'ember';

export default Ember.Route.extend({
  setupUtils: Ember.inject.service('setup'),
  model: function () {
    this.get("setupUtils").appStartup();
  },
  //This may need to be updated in the future depending on what we do
  //in regards to pre-loading data
  beforeModel: function() {
    if(!this.parseAuth.loggedIn) {
      this.transitionTo("login");
    }
  },
  actions: {
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
    }
  }
});

