import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    takeQuiz: function() {
      this.transitionTo("question", 0);
    },
    salaries: function() {
      this.status.warn("This has not been implemented yet");
    },
    proximity: function() {
      this.transitionTo("proximity");
    },
  }
});
