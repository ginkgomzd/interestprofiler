import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNames: ["modalWindow"],
  templateName: 'modal',
  tap: function(e) {
    if(Ember.$(e.target).attr("data-action") === "leftButton") {
      this.modal.leftClick();
    }
    if(Ember.$(e.target).attr("data-action") === "rightButton") {
      this.modal.rightClick();
    }
  }
});
