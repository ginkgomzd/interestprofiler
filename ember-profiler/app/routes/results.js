import Ember from 'ember';

export default Ember.Route.extend({
    dataUtils: Ember.inject.service('dataUtils'),
    model: function() {

      if (this.get("dataUtils").dirtyAnswers()) {
        this.controllerFor("results").set("fetching", true);
        var that = this;
        this.get("dataUtils").updateAllResults().then(function(result) {
          that.controllerFor("results").set("fetching", false);
        });
      }

      return this.store.find('scoreArea');
    }
});

