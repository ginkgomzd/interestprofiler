import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'button',
  classNames : ["button"],
  classNameBindings : ["answerIndex"],
  answerIndex: function() { return "answer" + this.opt.get("value");}.property(),
  templateName: 'answer',
  tap: function() {
    this.get("controller").send("makeSelection", this.opt.get("value"));
  },
  press: function() {
    this.get("controller").send("makeSelection", this.opt.get("value"));
  }
});
