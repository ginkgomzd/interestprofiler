import Ember from 'ember';
import onet from 'onet';

export default Ember.Route.extend({
    model: function() {
      //todo: we should create an initilizer that creates a settings controller
      //It will register itself on all views, controllers and routes.
      //That controller should loop through all the settings in the database and
      //make them properties
      //it should also have a getter and setter for getting and setting
      //settings, that will then be observed and stored in the database.

      var oldAnswerString = this.settings.CalculatedAnswers;
      var answerString = concatAnswerString(this.store);
      var scores = this.store.all('scoreArea');

      if (scores.get("length") === 0 ||
        !oldAnswerString ||
        oldAnswerString !== answerString)
      {
        this.controllerFor("results").set("fetching", true);
        fetchProfilerResults(answerString, this);
      }

      return this.store.find('scoreArea');
    }
});

function concatAnswerString(store) {
  var answerString = "";
  store.all('answer').forEach(function(item) {
    answerString += item.get('selection');
  });
  //This pads the answer string with 3's to 60 characters in length
  return String(answerString + "333333333333333333333333333333333333333333333333333333333333").slice(0, 60);
}

function fetchProfilerResults(answerString, route) {
  route.settings.save("CalculatedAnswers", answerString);
  onet.interestProfiler.results(answerString).then(function (data) {
    data.forEach(function (item) {

      var r = route.store.getById('scoreArea', item.id);
      if (r===null) {
        r = route.store.createRecord('scoreArea', item);
      }

      r.set("area", item.area);
      r.set("score", item.score);
      r.set("desc", item.desc);
      r.save();

    });
    setTimeout(function() {
      route.controllerFor("results").set("fetching", false);
    }, 2000);
  });
}
