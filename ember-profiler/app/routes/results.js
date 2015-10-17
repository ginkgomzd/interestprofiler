import Ember from 'ember';

export default Ember.Route.extend({
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
    model: function() {

      if (this.get("profilerDataUtils").dirtyAnswers()) {
        return this.get("profilerDataUtils").updateAllResults('results');
      }

      return this.store.find('scoreArea');
    }
});

