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
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      onet.interestProfiler.careers(answerString).then(function (data) {
          var promises = [];
          data.forEach(function (item) {
            //Add each of these lookups to a promise hash so that it
            // doesn't resolve until all updates are complete
            promises.push(that.updateCareer(item));
          });
          Ember.RSVP.hash(promises).then(function(hash) {
              resolve(hash);
            },
            function(reason) {
              reject(reason);
            }
          );

        },
        function(error) {
          reject(error);
        });
    });
  },
  updateCareer: function(item) {
    var store = this.get("store");
    return new Ember.RSVP.Promise(function(resolve, reject) {
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
        record.set("score", score);
        if (record.save()) {
          resolve(record);
        } else {
          reject(record);
        }
      });
    });
  },

  updateAllResults: function(answerString) {
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
    var oldAnswerString = this.settings.CalculatedAnswers;
    var answerString = this.concatAnswerString();
    var scores = this.get("store").all('scoreArea');

    return (scores.get("length") === 0 ||
      !oldAnswerString ||
      oldAnswerString !== answerString)
  }

});

export default dataUtils;
