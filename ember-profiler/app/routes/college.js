import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  indexService: Ember.inject.service('index'),
  model: function(params) {
    return Ember.RSVP.hash({
      "college": this.store.find('college', params.index),
      "programs": this.get("indexService").find('program', EmberENV.modelPaths.collegeIndex, params.index, this.store)
    });
  }
});
