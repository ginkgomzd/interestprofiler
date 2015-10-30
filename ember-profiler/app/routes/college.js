import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  model: function(params) {
    return Ember.RSVP.hash({
      "college": this.store.find('college', params.index),
      "programs": this.store.find('program', {"college": params.index}),
    });
  }
});
