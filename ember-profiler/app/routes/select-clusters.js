import Ember from 'ember';

export default Ember.Route.extend({
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
  model: function() {
    if (this.get("profilerDataUtils").dirtyAnswers()) {
      this.get("profilerDataUtils").updateAllResults();
    }
    return this.store.find('cluster');
  },
});
