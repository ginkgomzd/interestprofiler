import Ember from 'ember';
import onet from 'onet';

var dataUtils = Ember.Object.extend({
  store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  concatAnswerString: function ()
  {
    var answerString = "";
    this.get("store").all('answer').forEach(function (item) {
      answerString += item.get('selection');
    });
    //This pads the answer string with 3's to 60 characters in length
    return String(answerString + "333333333333333333333333333333333333333333333333333333333333").slice(0, 60);

    //This is left here because it results in better "sample data" for testing
    //return String(answerString + "333421321134342523523523254555312111351145453111211151311411").slice(0, 60);
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
          resolve(data);
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
            var record = store.getById("occupation", item.code);
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
            record.set("score", score);
            record.save();
          });
          resolve(data);
        },
        function(error) {
          reject(error);
        });
    });
  },

  updateAllResults: function() {
    var that = this;
    var answerString = this.concatAnswerString();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var promises = {
        results: that.updateProfilerResults(answerString),
        careers: that.updateCareerResults(answerString)
      };

      Ember.RSVP.hash(promises).then(function (hash) {
        //Success!
        //todo: Move this to the user object so that it is automagically stored in the cloud

        that.get("settings").save("CalculatedAnswers", answerString);
        resolve(hash);
      }, function (reason) {
        //Failed to update all
        reject(reason);
      });
    });
  },

  dirtyAnswers: function() {
    var oldAnswerString = this.get("settings").CalculatedAnswers;
    var answerString = this.concatAnswerString();
    var scores = this.get("store").all('scoreArea');

    return (scores.get("length") === 0 ||
      !oldAnswerString ||
      oldAnswerString !== answerString);
  }

});

export default dataUtils;
