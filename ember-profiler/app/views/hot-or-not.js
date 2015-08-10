import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNames: ['hot-or-not', 'full'],
  templateName: 'hot-or-not',
  pan: function(e) {
    e.stopPropagation();
    var alumniImg = this.$('.img-alumni');
    var delta = e.originalEvent.gesture.deltaX;
    var threshold = this.$().width() / 2;
    if(delta < 0) {
      //Swiping Left
      var opac = (0 - (delta / threshold)).toFixed(2);
      this.$().css("background-color", "rgba(255, 0, 0, " + opac + ")");
      if((delta + threshold) < 0) {
        this.get("controller").send("hotOrNot", false);
      }
    } else if(delta > 0) {
      //Swiping Right
      var opac = (delta / threshold).toFixed(2);
      this.$().css("background-color", "rgba(45, 206, 6, " + opac + ")");
      if(delta >= threshold) {
        //e.originalEvent.gesture.velocityX
        this.get("controller").send("hotOrNot", true);
      }
    }
    alumniImg.css("transform", "translateX(" + e.originalEvent.gesture.deltaX +"px)");
  },
  panStart: function(e) {
    this.get("controller").send("disableDrawerSwipe");
  },
  panEnd: function(e) {
    this.get("controller").send("enableDrawerSwipe");
  }
});
