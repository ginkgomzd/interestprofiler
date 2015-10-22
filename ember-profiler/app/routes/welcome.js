import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    takeQuiz: function() {
      this.transitionTo("question", 0);
    },
    salaries: function() {
      this.transitionTo("select-clusters");
    },
    proximity: function() {
      this.transitionTo("proximity");
    }
  }
});
