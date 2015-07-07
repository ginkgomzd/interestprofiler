import Ember from 'ember';

export function initialize(registry, application) {
  var modalObject = Ember.Object.extend({
    leftButton: {
      visible: 'enabled',
      text: 'Cancel',
      callback: function() {}
    },
    rightButton: {
      visible: 'enabled',
      text: 'OK',
      callback: function() {}
    },
    message: '',
    modalOpen: false,
    alert: function(msg) {
      this.set("message", msg);
      this.set("rightButton.text", "OK");
      this.set("rightButton.visible", "enabled");
      this.set("leftButton.visible", "disabled");
      this.rightButton.callback = null;
      this.show();
    },
    confirm: function(msg, options) {
      options = options || {};
      this.set("message", msg);

      if (typeof(options.right) !== "undefined") {
        this.set("rightButton.visible", "enabled");
        this.set("rightButton.text", options.right.text || "OK");
        this.rightButton.callback = options.right.action || null;
      } else {
        this.set("rightButton.visible", "disabled");
        this.rightButton.callback = null;
      }

      if (typeof(options.left) !== "undefined") {
        this.set("leftButton.visible", "enabled");
        this.set("leftButton.text", options.left.text || "Cancel");
        this.leftButton.callback = options.left.action || null;
      } else {
        this.set("leftButton.visible", "disabled");
        this.leftButton.callback = null;
      }

      if(this.leftButton.visible === "disabled" && this.rightButton.visible === "disabled") {
        this.set("rightButton.visible", "enabled");
      }

      this.show();
    },
    hide: function() {
      this.set("modalOpen", false);
    },
    show: function() {
      this.set("modalOpen", true);
    },
    leftClick: function() {
      if(typeof this.leftButton.callback === 'function') {
        this.leftButton.callback();
      }
      this.hide();
    },
    rightClick: function() {
      if(typeof this.rightButton.callback === 'function') {
        this.rightButton.callback();
      }
      this.hide();
    }
  });
  application.register('modal:main', modalObject);
  application.inject('route', 'modal', 'modal:main');
  application.inject('controller', 'modal', 'modal:main');
  application.inject('view', 'modal', 'modal:main');
  application.inject('component', 'modal', 'modal:main');
}

export default {
  name: 'modal',
  initialize: initialize
};
