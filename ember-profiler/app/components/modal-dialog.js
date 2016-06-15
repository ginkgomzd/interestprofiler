import Ember from 'ember';

export default Ember.Component.extend({
  modal: Ember.inject.service('modal'),
  tagName: 'div',
  classNames: ["modalWrapper"],
  classNameBindings: ["modal.modalOpen:modalOpen:modalClosed"],
  templateName: 'modal-dialog',
  actions: {
    leftButtonClick: function() {
      this.get("modal").leftClick();
    },
    rightButtonClick: function() {
      this.get("modal").rightClick();
    }
  }
});
