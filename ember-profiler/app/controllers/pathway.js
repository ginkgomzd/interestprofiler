import Ember from 'ember';

export default Ember.Controller.extend({
  occupations: function() {
    return this.get("model").occupations;
  }.property('model'),
  actions: {
    exploreColleges: function() {
      this.modal.alert("This has not yet been implemented");
    },
    exploreOccupation: function() {
      this.modal.alert("We don't currently know anything more about this occupation. So sorry.");
    }
  }
});
