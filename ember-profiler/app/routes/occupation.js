import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  model: function(params) {
    return Ember.RSVP.hash({
      "occupation": this.store.find('occupation', params.index),
      "programs": this.store.find('program', {"occupation": params.index}),
      "colleges": this.get("rawData").fetch("H2CColleges", 'college')
    });
  },
  actions: {
    viewCollege: function(collegeID) {
      this.transitionTo("college", collegeID);
    }
  }
});
