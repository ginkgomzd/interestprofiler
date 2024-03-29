import Ember from 'ember';

export default Ember.Component.extend({
  status: Ember.inject.service('status'),
  tagName: 'div',
  classNames: ["message"],
  classNameBindings: ["message.messageClass"],
  templateName: 'statusMessage',
  didInsertElement: function() {
    this.$().hide().fadeIn("fast");
    if (this.message.messageClass !== "error") {
      var that = this;
      setTimeout(function() {that.dismiss();}, 5000);
    }
  },
  dismiss: function(speed) {
    if (!this.dismissing) {
      this.dismissing = true;
      speed = speed || "slow";
      var that = this;
      this.$().animate({opacity: 0}, speed, "linear", function () {
        that.$().slideUp("slow", function() {
          that.get("status").dismissMessage(that.message);
        });
      });
    }
  },
  tap: function() {
    this.dismiss("fast");
  },
  click: function() {
    this.dismiss("fast");
  }
});
