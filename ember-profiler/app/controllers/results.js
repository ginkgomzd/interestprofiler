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
        var newWidth = (scoreWidget.data('score') / 40 * 100) + '%';
        scoreWidget.find(".fill").css({width: newWidth});
      });
    }
  }
});
