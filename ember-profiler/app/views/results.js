import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'results',

  // TODO: All these selectors are really broad; it would be better to narrow them
  // and add this listener to the profileScore view instead. It wasn't easy to write
  // this code in a way that it'd fire just once per item, so instead I moved it
  // up to the aggregate view where the code would run just once on the collection.
  // The challenge to putting this code in the profileScore view is that we're
  // setting tagName to '' in order to produce valid HTML, but this takes away
  // our ability to use this.$() to access the view in jQuery.

  didInsertElement: function() {
    // render thermometer
    Ember.$('dd .score').each(function() {
      // TODO: this is not a very MVC way to do this... we shouldn't have to rely on data attributes
      var scoreWidget = Ember.$(this);
      var score = scoreWidget.data('score');
      var width = (score/40*100) + '%';
      scoreWidget.append(Ember.$("<div/>", {
        "class": "fill",
        width: width
      }));
    });

    // wire up show/hide
    Ember.$('dd, dt').click(function() {
      var clickedClass = Ember.$(this).attr('class');
      var selector = 'dd.' + clickedClass + ' .desc';

      Ember.$('dd .desc').hide();
      Ember.$(selector).show();
    });
  }
});
