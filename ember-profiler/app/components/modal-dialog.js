import Ember from 'ember';

export default Ember.View.extend({
  modal: Ember.inject.service('modal'),
  tagName: 'div',
  classNames: ["modalWindow"],
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
