import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  suggestedAlumni: [],
  index: 0,
  model: function (params) {
    this.set("index", params.index);

    if(params.index == 0 ||
      this.get("suggestedAlumni").length === 0 ||
      params.index > this.get("suggestedAlumni").length) {
      var that = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {

        that.getSuggestedAlumni().then(function(alumniIds) {
          that.set("suggestedAlumni", alumniIds);
          that.set("index", 0);

          that.store.find('alumni', alumniIds[0]).then(function(alumniModel) {
            resolve(alumniModel);
          });
        });
      });
    } else {
      return this.store.find('alumni', this.get("suggestedAlumni")[params.index]);
    }
  },
  getSuggestedAlumni: function() {
    //This is rather simple right now, but in future it will have more
    // logic for filtering/matching alumni
    return this.get("rawData").fetchKeys("H2CAlumni", "alumni");
  }
});
