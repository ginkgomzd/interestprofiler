import Ember from 'ember';

export default Ember.Controller.extend({
  hideBackButton: true,
  actions: {
    reachedEdge: function(slick, direction) {
      if (direction === "left") {
        this.send("navigateAway");
      }
    }
  }
});