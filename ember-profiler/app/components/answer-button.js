import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  classNames : ["button"],
  attributeBindings: ["opt.label:value", "type"],
  type: "button",
  classNameBindings : ["answerIndex"],
  answerIndex: function() { return "answer" + this.opt.get("value");}.property(),
  click: function() {
    this.makeSelection(this.opt.get("value"));
  },
  makeSelection: function(selectedAnswer) {
    var that = this;
    this.$().animate({backgroundColor: Ember.$.Color({ alpha: 0.3 })}, 200, function() {
      that.$().animate({backgroundColor: Ember.$.Color({ alpha: 0 })}, 200, function() {
        that.sendAction("onClick", selectedAnswer);
      });
    });
  },
});
