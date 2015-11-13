import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'li',
  templateName: 'cluster',
  classNameBindings: ['numberOfDots'],
  numberOfDots: Ember.computed(function() {
    var names = ["zero", "one", "two", "three", "four"];
    return names[ Math.round((this.cluster.get("score") / 3) * 4) ] + "Dots";
  }),
  didInsertElement: function() {
    if (this.cluster.get("id") === this.get('controller').toggling) {
      this.get('controller').set("toggling", null);
      this.$().hide().slideDown();
    }
  },
  press: function() {
    var that = this;
    this.$().slideUp(function() {
      Ember.$("body").animate({ scrollTop: 0 }, {complete: function() {
        that.get('controller').send('toggleClusterSelection', that.cluster.get("id"));
      }});
    });
  }
});
