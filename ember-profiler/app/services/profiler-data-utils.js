import Ember from 'ember';
import onet from 'onet';

var profilerDataUtils = Ember.Object.extend({
  store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  parseAuth: Ember.inject.service('parse-auth'),
  answerString: function () {
    var answerString = "";
    this.get("store").all('answer').forEach(function (item) {
      answerString += item.get('selection');
    });

    return answerString;
  },
  onetApiFormattedAnswerString: function () {
    var answerString = this.answerString();

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
            var record = store.getById("onet-career", item.code);
            if (record !== null) {
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
            } else {
              //That Career isn't in the database.
            }
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
    var answerString = this.onetApiFormattedAnswerString();
    this.get("settings").save("fetchingResults", true);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var promises = {
        results: that.updateProfilerResults(answerString),
        careers: that.updateCareerResults(answerString)
      };

      Ember.RSVP.hash(promises).then(function (hash) {
        //Success!
        that.get("settings").save("fetchingResults", false);
        that.get("settings").save("CalculatedAnswers", answerString);
        //This saves the current user answer string to Parse
        that.saveUserAnswers();
        resolve(hash);
      }, function (reason) {
        //Failed to update all
        reject(reason);
      });
    });
  },

  saveUserAnswers: function() {
    var answerString = this.answerString();
    this.get("parseAuth").user.set("answers", answerString);
    this.get("parseAuth").user.save();
  },

  populatePreviousAnswers: function() {
    var answers = this.get("parseAuth").user.get("answers");
    var store = this.get("store");
    var i = 0;
    while (i <= answers.length - 1) {
      var index = i + 1;
      var record = store.getById("answer", index);
      if (record === null) {
        record = store.createRecord("answer", {id: index, question: store.getById("question", index), selection: answers[i]});
      } else {
        record.set("question", index);
        record.set("selection", answers[i]);
      }
      record.save();
      i++;
    }
    this.get("settings").save("answers", answers);
  },
  marshalSavedAnswers: function() {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (that.get("parseAuth").user !== null) {
        that.get("store").findAll("answer").then(function (data) {
          var parseAnswerString = that.get("parseAuth").user.get("answers");
          var localAnswerString = that.answerString();

          if (localAnswerString.length === 0 && parseAnswerString.length > 0) {
            that.populatePreviousAnswers();
            resolve(true);
          }
          resolve(false);
        });
      } else {
        resolve(false);
      }
    });
  },

  dirtyAnswers: function() {
    var oldAnswerString = this.get("settings").CalculatedAnswers;
    var answerString = this.onetApiFormattedAnswerString();
    var scores = this.get("store").all('scoreArea');

    return (scores.get("length") === 0 ||
      !oldAnswerString ||
      oldAnswerString !== answerString);
  },
  saveAnswerToParse: function(answer) {
    var answerString = this.get("parseAuth").user.get("answers");
    if (answerString.length > answer.id) {
      answerString = answerString.substr(0, answer.id - 1) + answer.selection + answerString.substr(answer.id);
    } else if (answerString.length === answer.id - 1) {
      answerString = answerString + answer.selection;
    } else {
      answerString = this.answerString();
    }
    this.get("parseAuth").user.set("answers", answerString);
    this.get("settings").save("answers", answerString);
    this.get("parseAuth").user.save();
  }

});

export default profilerDataUtils;
