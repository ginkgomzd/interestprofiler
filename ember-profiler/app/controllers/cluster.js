import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: [""],
  occupations: Ember.computed.sort("model.occupations", 'sortProperties'),
  showBackButton: "ios",
  showSortScore: function() {
    return (this.settings.ProgressQuiz3 === "complete");
  }.property("settings.ProgressQuiz3"),
  actions: {
    viewOccupation: function(occupationId) {
      this.transitionToRoute("occupation", occupationId);
    },
    sortHighSalary: function() {
      Ember.$(".sortTypes .sortOption").removeClass("active");
      Ember.$(".sortTypes .sortOption.sortHighSalary").addClass("active");
      this.set("sortProperties", ["salary:desc"]);
    },
    sortHighSalaryChange: function() {
      Ember.$(".sortTypes .sortOption").removeClass("active");
      Ember.$(".sortTypes .sortOption.sortHighSalaryChange").addClass("active");
      this.set("sortProperties", ["first.totalAwards"]);
    },
    sortAlphabetical: function() {
      Ember.$(".sortTypes .sortOption").removeClass("active");
      Ember.$(".sortTypes .sortOption.sortAlphabetical").addClass("active");
      this.set("sortProperties", ["first.title"]);
    },
    sortScore: function() {
      Ember.$(".sortTypes .sortOption").removeClass("active");
      Ember.$(".sortTypes .sortOption.sortScore").addClass("active");
      this.set("sortProperties", ["first.score:desc"]);
    }
  }
});
