import Ember from 'ember';

export default Ember.Controller.extend({
  status: Ember.inject.service('status'),
  occupations: function() {
    return this.get("model").occupations;
  }.property('model'),
  actions: {
    exploreColleges: function() {
      this.get("status").warn("This has not yet been implemented");
    },
    exploreOccupation: function(id) {
      this.transitionToRoute("/occupation/" + id);
    }
  }
});
