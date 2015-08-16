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

    updateProfilerResults: function (answerString, route) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
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
          resolve();
        },
        function(error) {
          reject(error);
        });
      });
    },
    updateCareerResults: function(answerString, route) {
      //This section fetches the career scores.
      return new Ember.RSVP.Promise(function(resolve, reject) {
        onet.interestProfiler.careers(answerString).then(function (data) {
          data.forEach(function (item) {

            //todo: verify that item._fit doesn't fall out of scope when the promise is resovled
            route.store.find('occupation', {code: item.code}).then(function (record) {
              var score;
              switch (item._fit) {
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

          resolve(true);

        },
        function(error) {
          reject(error);
        });
      });
    },

    updateAllResults: function(answerString, route) {
      var dataUtils = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
        var promises = {
          results: dataUtils.updateProfilerResults(answerString, route),
          careers: dataUtils.updateCareerResults(answerString, route)
        };

        Ember.RSVP.hash(promises).then(function (hash) {
          //Success!
          route.controllerFor("results").set("fetching", false);
          route.settings.save("CalculatedAnswers", answerString);
          resolve();
        }, function (reason) {
          //Failed to update all
          reject(reason);
        });
      });
    }
  };
}
