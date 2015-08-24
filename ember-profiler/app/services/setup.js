import Ember from 'ember';

var setupService = Ember.Object.extend({
  store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  checkForUpdates: function() {

  },
  appStartup: function() {

  }

});

export default setupService;
