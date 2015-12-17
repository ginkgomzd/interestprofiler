import Ember from 'ember';

export default Ember.Controller.extend({
  sortBy: function() {return "";}.property(),
  occupations: function() {
    console.log("ReSort");
    return this.get("model").occupations.sortBy(this.get("sortBy"));
  }.property('sortBy'),
  actions: {
    viewOccupation: function(occupationId) {
      this.transitionToRoute("occupation", occupationId);
    },
    sortHighSalary: function() {
      Ember.$(".sortTypes .sortOption").removeClass("active");
      Ember.$(".sortTypes .sortOption.sortHighSalary").addClass("active");
      this.set("sortBy", "highSalary");
    },
    sortHighSalaryChange: function() {
      Ember.$(".sortTypes .sortOption").removeClass("active");
      Ember.$(".sortTypes .sortOption.sortHighSalaryChange").addClass("active");
      this.set("sortBy", "highSalaryChange");
    },
    sortAlphabetical: function() {
      Ember.$(".sortTypes .sortOption").removeClass("active");
      Ember.$(".sortTypes .sortOption.sortAlphabetical").addClass("active");
      this.set("sortBy", "title");
    }
  }
});
