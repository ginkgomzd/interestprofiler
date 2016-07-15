import Ember from 'ember';

export default Ember.Route.extend({
  modal: Ember.inject.service('modal'),
  rawData: Ember.inject.service('raw-data'),
  suggestedAlumni: [],
  index: 0,
  model: function (params) {
    this.set("index", params.index);

    if(params.index == -1 || // jshint ignore:line
      this.get("suggestedAlumni").length === 0 ||
      params.index > this.get("suggestedAlumni").length) {
      var that = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {

        that.getSuggestedAlumni().then(function(alumniIds) {
          that.set("suggestedAlumni", alumniIds);
          if(params.index == 0) { // jshint ignore:line
            that.store.findRecord('alumni', alumniIds[0]).then(function(alumniModel) {
              resolve(alumniModel);
            });
          } else {
            that.transitionTo('alumni', 0);
            resolve(true);
          }
        });
      });
    } else {
      return this.store.findRecord('alumni', this.get("suggestedAlumni")[params.index]);
    }
  },
  getSuggestedAlumni: function() {
    //This is rather simple right now, but in future it will have more
    // logic for filtering/matching alumni
    return this.get("rawData").fetchKeys(EmberENV.modelPaths.alumni.emberDataNamespace, "alumni");
  },
  actions: {
    navigateNext: function() {
      var next = 1 + parseInt(this.get('index'));
      if (next < this.get('suggestedAlumni').length) {
        this.transitionTo('alumni', next);
      } else {
        var that = this;
        this.get("modal").confirm("You've reached the end of your recommended alumni profiles. Continue to view careers that match your interests.",
          {right: {text: "Continue", action: function() {
            that.transitionTo('select-clusters');
          }}});
      }
    },
    /**
     * This method is triggered by the global back-button and should
     * "unset" the previous selection
     */
    executeBackAction: function() {
      var prev = parseInt(this.get('index')) - 1;
      if (prev > -1) {
        //Set the index back one.
        this.set("index", prev);
        //Unset what we last selected
        this.store.findRecord('hotOrNot', this.suggestedAlumni[prev]).then(function(hotOrNotModel) {
          hotOrNotModel.destroyRecord();
          //Transition Backwards.
          //We are using history here rather than transition to prev,
          // because otherwise it breaks the backbutton when you get to the first
          //alumni profile. You would end up in a loop.
          window.history.back();
        });
        return false;
      }
      return true;
    }
  }
});
