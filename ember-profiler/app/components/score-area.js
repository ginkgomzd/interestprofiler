import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  templateName: 'scoreArea',
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.updateScoreIndicator();
    });
  },
  updateScoreIndicator: function() {
    
      var newScore = this.scoreArea.get("score");
      var newWidth = (newScore / 40 * 100) + '%';

      var R = Math.round(202 - (newScore / 40 * 66));
      var G = Math.round(233 - (newScore / 40 * 28));
      var B = Math.round(180 - (newScore / 40 * 94));
      var bgColor = "rgb(" + R + "," + G + "," + B + ")";

      this.$().find(".fill").css({width: newWidth, backgroundColor: bgColor});
  }.observes("scoreArea.score"),
  actions: {
    toggleDescription: function() {
      this.$().find(".desc").slideToggle();
    }
  }
});
