import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNameBindings: ["parseAuth.loggedIn:menu-shown:menu-hidden"],
  templateName: 'application',
  panRight: function(e) {
    if (e.originalEvent.gesture.deltaX > 100) {
      if(e.originalEvent.gesture.pointers[0].pageX < 150) {
        this.get("controller").send("showDrawer");
        return e.preventDefault();
      }
    }
  }
});

