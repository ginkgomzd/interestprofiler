import Ember from 'ember';
import dataUtils from '../utils/data-utils';

export default Ember.Route.extend({
    model: function() {

      var oldAnswerString = this.settings.CalculatedAnswers;
      var answerString = dataUtils().concatAnswerString(this.store);
      var scores = this.store.all('scoreArea');

      if (scores.get("length") === 0 ||
        !oldAnswerString ||
        oldAnswerString !== answerString)
      {
        this.controllerFor("results").set("fetching", true);
        dataUtils().updateAllResults(answerString, this);
      }

      return this.store.find('scoreArea');
    }
});

