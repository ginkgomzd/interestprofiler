import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNames: ['hot-or-not', 'full'],
  templateName: 'hot-or-not',
  transitioning: false,
  doTransition: function() {
    var alumniImg = this.$('.img-alumni');
    //reset the profile image to centered, and scaled to 0,0
    alumniImg.css({transform: "matrix(0, 0, 0, 0, 0, 0)", textIndent: 0});

    var that = this;
    alumniImg.animate({textIndent: 100 }, {
      step: function(now,fx) {
        var s = now / 100;
        alumniImg.css('transform','scale('+s+', '+s+')');
      },
      duration:'fast', complete: function() {
        that.set("transitioning", false);
      }});

    //Make this function run every time the model changes
  }.observes("controller.model"),
  pan: function(e) {
    e.stopPropagation();
    if (!this.get("transitioning") && this.origin !== null) {
      var alumniImg = this.$('.img-alumni');

      //var delta = e.originalEvent.gesture.deltaX;
      var delta = 0 - (this.origin - e.originalEvent.gesture.pointers[0].pageX);
      var threshold = this.$().width() / 2;
      if (delta < 0) {
        //Swiping Left
        var opac = (0 - (delta / threshold)).toFixed(2);
        this.$().css("background-color", "rgba(255, 0, 0, " + opac + ")");
        if ((delta + threshold) < 0) {
          this.set("transitioning", true);
          this.origin = null;
          this.get("controller").send("hotOrNot", false);
        }
      } else if (delta > 0) {
        //Swiping Right
        var opac = (delta / threshold).toFixed(2);
        this.$().css("background-color", "rgba(45, 206, 6, " + opac + ")");
        if (delta >= threshold) {
          //e.originalEvent.gesture.velocityX
          this.origin = null;
          this.set("transitioning", true);
          this.get("controller").send("hotOrNot", true);
        }
      }
      alumniImg.css("transform", "translateX(" + delta + "px)");
    }
  },
  panStart: function(e) {
    this.get("controller").send("disableDrawerSwipe");
    this.origin = e.originalEvent.gesture.pointers[0].pageX;
    //console.log("start");
  },
  panEnd: function(e) {
    //console.log("End");
    this.get("controller").send("enableDrawerSwipe");
    this.origin = null;
  },
  panCancel: function(e) {
    //console.log("Cancel");
    this.origin = null;
    this.get("controller").send("enableDrawerSwipe");
  }
});
