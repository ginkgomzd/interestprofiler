import Ember from 'ember';
//import dataUtils from '../utils/data-utils';

export default Ember.Route.extend({
    dataUtils: Ember.inject.service('dataUtils'),
    model: function() {

      var oldAnswerString = this.settings.CalculatedAnswers;
      var answerString = this.get("dataUtils").concatAnswerString(this.store);
      var scores = this.store.all('scoreArea');

      if (scores.get("length") === 0 ||
        !oldAnswerString ||
        oldAnswerString !== answerString)
      {
        this.controllerFor("results").set("fetching", true);
        var that = this;
        this.get("dataUtils").updateAllResults(answerString, this.store).then(function(result) {
          console.log("All");
          that.controllerFor("results").set("fetching", false);
        });
      }

      return this.store.find('scoreArea');
    }
});

