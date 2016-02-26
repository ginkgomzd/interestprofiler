import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return [
      "Slide1.png",
      "Slide2.png",
      "Slide3.png",
      "Slide4.png"
    ];
  }
});
