import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNames: ['hot-or-not', 'full'],
  templateName: 'hot-or-not',
  transitioning: false,

  setupImageLoad: function() {
    var that = this;
    //Using a javascript image object allows us to trap the on-load event
    //and take certain action after.
    var img = new Image();
    img.src = this.get("controller").get("model").get("getImgPath");
    img.onload = function() {
      //Call the animation function that fades the image in.
      that.fadeImageIn(img);
    };
  }.on('didInsertElement'),

  /**
   * This function runs every time the model changes and
   * animates the "bounce in" of the enxt profile image.
   */
  fadeImageIn: function(img) {
    var that = this;
    var alumniImg = this.$('.img-alumni');

    //reset the profile image to centered, and scaled to 0,0
    alumniImg.css({transform: "matrix(1, 0, 0, 1, 0, 0)"}).hide();

    //reset the color to "white" (transparent so the background under shows)
    this.$().css("background-color", "transparent");

    //Set the image source
    this.$().find("img").attr("src", img.src);

    //Fade in
    alumniImg.fadeIn("fast", function() {
        that.set("transitioning", false);
    });
  },

  /**
   * This function returns the profile image to center
   *
   * @param start - The current offset position
   */
  returnToStart: function(start) {
    var alumniImg = this.$('.img-alumni');
    this.$().css("background-color", "transparent");
    Ember.$({foo: start }).animate({foo: 0 }, {
      step: function(now) {
        alumniImg.css('transform','translateX('+now+'px)');
      }, duration:100});
  },

  /**
   * This function animates the Transform to move the profileimage
   * off screen even without the touch event. It takes into account
   * velocity to give the swipe a very fluid feel.
   *
   * @param start
   * @param velocity
   * @param action
   */
  slideOffScreen: function(start, velocity, action) {
    this.origin = null;
    this.set("transitioning", true);
    var alumniImg = this.$('.img-alumni');
    var that = this;
    var target = this.$().width();
    if(velocity > 0) {
      target = -target;
    }
    var speed = Math.abs(Math.round((target - start) / velocity));
    if (speed > 500) {
      speed = 500;
    }
    Ember.$({foo: start }).animate({foo: target }, {
      step: function(now) {
        alumniImg.css('transform','translateX('+now+'px)');
      },
      duration:speed, complete: function() {
        that.get("controller").send("hotOrNot", action);
      }});
  },

  /**
   * This handles the movement of a finger or mouse and animates the
   * profile image's movement.
   *
   * @param e - TouchEvent
   */
  pan: function(e) {
    e.stopPropagation();
    if (!this.get("transitioning") && this.origin !== null) {
      var alumniImg = this.$('.img-alumni');

      //var delta = e.originalEvent.gesture.deltaX;
      var delta = 0 - (this.origin - e.originalEvent.gesture.pointers[0].pageX);
      var threshold = this.$().width() / 2;
      var opac;
      if (delta < 0) {
        //Swiping Left
        opac = (0 - (delta / threshold)).toFixed(2);
        this.$().css("background-color", "rgba(255, 0, 0, " + opac + ")");
        if ((delta + threshold) < 0) {
          this.slideOffScreen(delta, e.originalEvent.gesture.velocityX, false);
        }
      } else if (delta > 0) {
        //Swiping Right
        opac = (delta / threshold).toFixed(2);
        this.$().css("background-color", "rgba(45, 206, 6, " + opac + ")");
        if (delta >= threshold) {
          this.slideOffScreen(delta, e.originalEvent.gesture.velocityX, true);
        }
      }
      alumniImg.css("transform", "translateX(" + delta + "px)");
    }
  },

  /**
   * This is when we first start to drag, so we are grabbing
   * grab center to calculate delta later on.
   *
   * @param e - TouchEvent
   */
  panStart: function(e) {
    //Temporarily disable the swipe for the drawer so it doesn't open
    //while we are trying to capture swipe gesture on the profile
    this.get("controller").send("disableDrawerSwipe");
    //Set the Swipe Origin so we can calculate deltaX.
    this.origin = e.originalEvent.gesture.pointers[0].pageX;
  },

  /**
   * This function resets swipe center, and also checks to see if
   * velocity is high enough to call it a completed swipe.
   *
   * @param e
   */
  panEnd: function(e) {
    if(!this.transitioning) {
      var delta = 0 - (this.origin - e.originalEvent.gesture.pointers[0].pageX);
      if (e.originalEvent.gesture.velocityX < -2) {
        //velocity is high enough to count as a swipe right
        this.slideOffScreen(delta, e.originalEvent.gesture.velocityX, true);
      } else if (e.originalEvent.gesture.velocityX > 2) {
        //velocity is high enough to count as a swipe left
        this.slideOffScreen(delta, e.originalEvent.gesture.velocityX, false);
      } else {
        //transition back to start.
        this.returnToStart(delta);
      }
    }
    //Reset swipe origin
    this.origin = null;
    //reenable drawer
    this.get("controller").send("enableDrawerSwipe");
  },
  panCancel: function() {
    //Reset swipe origin
    this.origin = null;
    //reenable drawer
    this.get("controller").send("enableDrawerSwipe");
  }
});
