import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    takeQuiz: function() {
      this.send("analytics", "welcomeSelection", "My Career Interests");
      this.transitionTo("question", 0);
    },
    salaries: function() {
      this.send("analytics", "welcomeSelection", "Inland Empire Salaries");
      this.transitionTo("select-clusters");
    },
    proximity: function() {
      this.send("analytics", "welcomeSelection", "Local Degrees and Colleges");
      this.transitionTo("proximity");
    }
  }
});
