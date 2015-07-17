import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    takeQuiz: function() {
      this.transitionTo("question", 1);
    }
  }
});
