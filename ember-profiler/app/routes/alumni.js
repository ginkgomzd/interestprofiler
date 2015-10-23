import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  suggestedAlumni: [],
  index: 0,
  model: function (params) {
    this.set("index", params.index);

    if(params.index == -1 ||
      this.get("suggestedAlumni").length === 0 ||
      params.index > this.get("suggestedAlumni").length) {
      var that = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {

        that.getSuggestedAlumni().then(function(alumniIds) {
          that.set("suggestedAlumni", alumniIds);
          that.transitionTo('alumni', 0);
          resolve(true);
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
  },
  actions: {
    navigateNext: function() {
      var next = 1 + parseInt(this.get('index'));
      if (next < this.get('suggestedAlumni').length) {
        this.transitionTo('alumni', next);
      } else {
        var that = this;
        this.modal.confirm("you've reached the end of your reccomended alumni profiles. Continue to view careers that match your interestes.",
          {right: {text: "Continue", action: function() {
            that.transitionTo('select-clusters');
          }}});
      }
    }
  }
});
