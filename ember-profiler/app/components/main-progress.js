import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['mainProgress'],
  classNameBindings: ['settings.ProgressStyle'],
  actions: {
    progressToggle: function() {
      if (this.settings.ProgressStyle === "condensed") {
        this.send("progressExpand");
      } else {
        this.send("progressCondense");
      }
      return false;
    },
    progressCondense: function() {
      this.settings.save("ProgressStyle", "condensed");
      return false;
    },
    progressExpand: function() {
      this.settings.save("ProgressStyle", "");
      return false;
    }
  }
});
