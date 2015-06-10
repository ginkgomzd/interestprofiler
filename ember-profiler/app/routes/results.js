import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
      var answers = getAnswers();

    }
});

function getAnswers() {
  return '111111111111111111111111111111111111111111111111111111111111';
}
