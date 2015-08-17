import Ember from 'ember';

export default Ember.Route.extend({
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
    model: function() {

      if (this.get("profilerDataUtils").dirtyAnswers()) {
        this.controllerFor("results").set("fetching", true);
        var that = this;
        this.get("profilerDataUtils").updateAllResults().then(function(result) {
          that.controllerFor("results").set("fetching", false);
        });
      }

      return this.store.find('scoreArea');
    }
});

