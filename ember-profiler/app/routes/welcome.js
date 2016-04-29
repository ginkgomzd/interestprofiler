import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    takeQuiz: function() {
      this.send("analytics", "welcomeSelection", "Jobs & Careers");
      this.transitionTo("question", 0);
    },
    salaries: function() {
      this.send("analytics", "welcomeSelection", "Wages & Salaries");
      this.transitionTo("select-clusters");
    },
    proximity: function() {
      this.send("analytics", "welcomeSelection", "Degrees & Colleges");
      this.transitionTo("proximity");
    }
  }
});
