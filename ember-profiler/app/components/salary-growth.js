import Ember from 'ember';

export default Ember.Component.extend({
  modal: Ember.inject.service('modal'),
  tagName: 'span',
  classNames: ["yellow", "salaryGrowth"],
  classNameBindings: ["float", "value:visible:hidden", "includeText:textVisible"],
  templateName: 'salary-growth',
  click: function(e) {
    this.get("modal").alert("Students with this degree have the highest percent change in salary.");
    e.stopPropagation();
  }
});
