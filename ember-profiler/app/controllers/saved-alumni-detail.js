import Ember from 'ember';

export default Ember.Controller.extend({
  jobGrowth: function () {
    var pathway = this.get("model").get("pathway");
    if (pathway) {
      return pathway.get("jobGrowth");
    } else {
      return false;
    }
  }.property("model.pathway.jobGrowth"),
  salaryGrowth: function () {
    var pathway = this.get("model").get("pathway");
    if (pathway) {
      return pathway.get("salaryGrowth");
    } else {
      return false;
    }
  }.property("model.pathway.salaryGrowth"),
  showGrowth: function () {
    return !!(this.get("salaryGrowth") || this.get("jobGrowth"));
  }.property("salaryGrowth,jobGrowth")
});