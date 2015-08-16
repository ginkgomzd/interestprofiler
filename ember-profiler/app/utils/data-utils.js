import Ember from 'ember';
import onet from 'onet';
export default function dateUtil() {

  return {
    concatAnswerString: function (store)
    {
      var answerString = "";
      store.all('answer').forEach(function (item) {
        answerString += item.get('selection');
      });
      //This pads the answer string with 3's to 60 characters in length
      return String(answerString + "333333333333333333333333333333333333333333333333333333333333").slice(0, 60);
    },

    fetchProfilerResults: function (answerString, route) {
      route.settings.save("CalculatedAnswers", answerString);
      onet.interestProfiler.results(answerString).then(function (data) {
        data.forEach(function (item) {

          var r = route.store.getById('scoreArea', item.id);
          if (r === null) {
            r = route.store.createRecord('scoreArea', item);
          }

          r.set("area", item.area);
          r.set("score", item.score);
          r.set("desc", item.desc);
          r.save();

        });
        setTimeout(function () {
          route.controllerFor("results").set("fetching", false);
        }, 2000);
      });
    }
  };
}
