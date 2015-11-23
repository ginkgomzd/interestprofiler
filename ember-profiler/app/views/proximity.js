import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  templateName: 'proximity',
  didInsertElement: function() {
    var propStop = function(event) {event.stopPropagation();};
    Ember.$("#ProximitySlider").on("touchstart", propStop).on("panstart", propStop).on("panright", propStop).on("touchmove", propStop).on("pan", propStop);
  }
});
