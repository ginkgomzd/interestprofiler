import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNameBindings: ["parseAuth.loggedIn:menu-shown:menu-hidden"],
  templateName: 'application',
  didInsertElement: function() {
    this.get("controller").set("drawerSwipeEnabled", true);
    if (window.cordova) {
      Ember.$("body").addClass("platform-" + cordova.platformId);
    }
  },
  panRight: function(e) {
    var ignoredTargets = ["ProximitySlider"];
    if(ignoredTargets.indexOf(e.target.id) !== -1) {
      return e;
    }
    if (this.get("controller").get("drawerSwipeEnabled")) {
      if (e.originalEvent.gesture.deltaX > 100) {
        if (e.originalEvent.gesture.pointers[0].pageX < 150) {
          this.get("controller").send("showDrawer");
          return e.preventDefault();
        }
      }
    }
  }
});

