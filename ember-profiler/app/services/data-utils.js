import Ember from 'ember';
import onet from 'onet';

var dataUtils = Ember.Object.extend({
  store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  concatAnswerString: function (store)
  {
    var answerString = "";
    store.all('answer').forEach(function (item) {
      answerString += item.get('selection');
    });
    //This pads the answer string with 3's to 60 characters in length
    return String(answerString + "333333333333333333333333333333333333333333333333333333333333").slice(0, 60);
  },

  updateProfilerResults: function (answerString) {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      onet.interestProfiler.results(answerString).then(function (data) {
          data.forEach(function (item) {

            var r = store.getById('scoreArea', item.id);
            if (r === null) {
              r = store.createRecord('scoreArea', item);
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
  updateCareerResults: function(answerString) {
    //This section fetches the career scores.
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      onet.interestProfiler.careers(answerString).then(function (data) {
          data.forEach(function (item) {

            //todo: verify that item._fit doesn't fall out of scope when the promise is resovled
            store.find('occupation', {code: item.code}).then(function (record) {
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
          resolve();
        },
        function(error) {
          reject(error);
        });
    });
  },

  updateAllResults: function(answerString) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var promises = {
        results: that.updateProfilerResults(answerString),
        careers: that.updateCareerResults(answerString)
      };

      Ember.RSVP.hash(promises).then(function (hash) {
        //Success!
        that.get("settings").save("CalculatedAnswers", answerString);
        resolve();
      }, function (reason) {
        //Failed to update all
        reject(reason);
      });
    });
  }
});

export default dataUtils;
