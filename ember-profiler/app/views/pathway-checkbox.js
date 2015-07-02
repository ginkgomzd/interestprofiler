import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'label',
  classNames: ["checkbox"],
  classNameBindings: ["pathway.bookmarked:checked:unchecked"],
  templateName: 'pathway-checkbox',
  didInsertElement: function() {
    if (this.pathway.get("id") === this.get('controller').toggling) {
      this.get('controller').set("toggling", false);

      //figure out if we need to scroll to bring the new position into view
      var parent = this.$().parent();
      var newTop = parent.offset().top;
      parent.hide();

      var oldTop = this.get('controller').get("oldTop");
      var calculatedTop = oldTop;
      var viewportBottom = oldTop + Ember.$(window).height();

      if(newTop > viewportBottom) {
        calculatedTop = newTop + 100;
      }

      if(newTop < oldTop + 150) {
        calculatedTop = newTop - 150;
      }

      //This delay is because the whole list get's refreshed
      //and we want to wait until it is reloaded.
      //because all items are removed from the dom the page
      //jumps to the top be default and this is an undesirable effect
      setTimeout(function() {
        Ember.$('body').scrollTop(oldTop);
        Ember.$('body').animate({scrollTop: calculatedTop}, {complete: function() {
          parent.slideDown();
        }});
      }, 15);
    }
  },
  press: function() {

    if (this.$().parent().prev().length !== 0 || this.$().parent().hasClass("checked")) {
      var that = this;
      var controller = this.get("controller");
      this.get("controller").set("toggling", this.pathway.get("id"));
      this.$().parent().slideUp("fast", function () {
        controller.set("oldTop", Ember.$('body').scrollTop());
        controller.send("toggleBookmark", that.pathway);
      });
    } else {
      this.get("controller").send("toggleBookmark", this.pathway);
    }
  }
});
