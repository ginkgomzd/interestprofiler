import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'li',
  templateName: 'cluster',
  didInsertElement: function() {
    if (this.cluster.get("id") === this.get('controller').toggling) {
      this.$().hide().slideDown();
    }
  },
  press: function() {
    var that = this;
    this.$().slideUp(function() {
      that.get('controller').send('toggleClusterSelection', that.cluster);
    });
  }
});
