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
    },
    fetchCareerResults: function(answerString, route) {
      //This section fetches the career scores.
      onet.interestProfiler.careers(answerString).then(function (data) {
        data.forEach(function (item) {

          //todo: verify that item._fit doesn't fall out of scope when the promise is resovled
          route.store.find('occupation', {code: item.code}).then(function(record) {
            var score;
            switch(item._fit) {
              case 'Good':
                score = 1;
                break;
              case 'Great':
                score = 2;
                break;
              case 'Best':
                score = 3;
                break;
            }
            console.log(score);
            record.set("score", score);
            record.save();
          });

        });
      });
    },

    updateAllResults: function(answerString, route) {
      this.fetchProfilerResults(answerString, route);
      this.fetchCareerResults(answerString, route);
    }
  };
}
