import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['mainProgress'],
  classNameBindings: ['settings.ProgressStyle'],
  press: function(e) {
    if (this.settings.ProgressStyle === "condensed") {
      this.settings.save("ProgressStyle", "");
    } else {
      this.settings.save("ProgressStyle", "condensed");
    }
    e.preventDefault();
  }
});
