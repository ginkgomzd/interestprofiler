import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  templateName: 'results',

  // TODO: All these selectors are really broad; it would be better to narrow them
  // and add this listener to the scoreArea view instead. It wasn't easy to write
  // this code in a way that it'd fire just once per item, so instead I moved it
  // up to the aggregate view where the code would run just once on the collection.
  // The challenge to putting this code in the scoreArea view is that we're
  // setting tagName to '' in order to produce valid HTML, but this takes away
  // our ability to use this.$() to access the view in jQuery.

  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.get("controller").send("updateWidths");
    });

    // wire up show/hide
    Ember.$('dd, dt').on("tap", function () {
      var clickedArea = Ember.$(this).attr('target');
      var selector = 'dd.' + clickedArea + ' .desc';

      //this is to only allow one at a time
      //I'm leaving it here in case functionality needs to be changed back in future.
      //Ember.$('dd .desc').removeClass("openDesc");
      //Ember.$(selector).addClass("openDesc");

      //this is for toggling visibility rater than replacing.
      Ember.$(selector).toggleClass("openDesc");
    });

  }

});
