import Ember from 'ember';

export function initialize(registry, application) {
  var statusObject = Ember.Object.extend({
    messages: Ember.ArrayController.create(),
    loadingTitle: function(){return "";}.property(),
    loadingMessage: function(){return "";}.property(),
    isLoading: function(){return false;}.property(),
    cssLoading: function(){return false;}.property(),
    success: function(msg, title) {
      title = title === undefined ? 'Success' : title;
      this.message(msg, title, 'success');
    },
    info: function(msg, title) {
      title = title === undefined ? 'Information' : title;
      this.message(msg, title, 'info');
    },
    warn: function(msg, title) {
      title = title === undefined ? 'Warning' : title;
      this.message(msg, title, 'warn');
    },
    error: function(msg, title) {
      title = title === undefined ? 'Error' : title;
      this.message(msg, title, 'error');
    },
    message: function(msg, title, messageClass) {
      this.messages.addObject({messageClass: messageClass, message: msg, title: title});
    },
    loading: function(title, msg, cancel) {
      if(window.plugins && window.plugins.spinnerDialog) {
        window.plugins.spinnerDialog.show(title, msg, cancel);
      } else {
        this.set("loadingTitle", title);
        this.set("loadingMessage", msg);
        this.set("cssLoading", true);
      }
      this.set("isLoading", true);
    },
    loadingComplete: function() {
      if(window.plugins && window.plugins.spinnerDialog) {
        window.plugins.spinnerDialog.hide();
      }
      this.set("isLoading", false);
      this.set("cssLoading", false);
    }
  });
  application.register('status:main', statusObject);
  application.inject('route', 'status', 'status:main');
  application.inject('controller', 'status', 'status:main');
  application.inject('view', 'status', 'status:main');
  application.inject('component', 'status', 'status:main');
}

export default {
  name: 'status',
  initialize: initialize
};
