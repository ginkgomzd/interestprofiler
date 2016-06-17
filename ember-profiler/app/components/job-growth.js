import Ember from 'ember';

export default Ember.Component.extend({
  modal: Ember.inject.service('modal'),
  tagName: 'span',
  classNames: ["yellow", "highDemand"],
  classNameBindings: ["float", "value:visible:hidden", "includeText:textVisible"],
  templateName: 'job-growth',
  click: function(e) {
    this.get("modal").alert("This indicates industry sectors that are a priority focus in the region; these sectors have training program investments.");
    e.stopPropagation();
  }
});
