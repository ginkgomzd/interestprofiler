import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNames: ["Toby"],
  templateName: 'application',
  panRight: function(e) {
    if (e.originalEvent.gesture.deltaX > 100) {
      if(e.originalEvent.gesture.pointers[0].pageX < 130) {
        console.log("OpenDrawer");
        this.get("controller").send("showDrawer");
        return e.preventDefault();
      }
    }
  }
});

