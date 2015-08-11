import Ember from 'ember';

export default Ember.Controller.extend({
  fetching: function() {return false;}.property(),
  fetchingWatcher:function () {
    if (!this.fetching) {
      this.send("updateWidths");
    }
  }.observes('fetching'),
  actions: {
    updateWidths: function() {
      Ember.$(".results .score").each(function() {
        var scoreWidget = Ember.$(this);
        var newScore = scoreWidget.data('score');

        var newWidth = (newScore / 40 * 100) + '%';

        var R = Math.round(202 - (newScore / 40 * 66));
        var G = Math.round(233 - (newScore / 40 * 28));
        var B = Math.round(180 - (newScore / 40 * 94));
        var bgColor = "rgb(" + R + "," + G + "," + B + ")";

        scoreWidget.find(".fill").css({width: newWidth, backgroundColor: bgColor});
      });
    }
  }
});
