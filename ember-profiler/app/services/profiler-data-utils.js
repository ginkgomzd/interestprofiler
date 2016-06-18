import Ember from 'ember';

var profilerDataUtils = Ember.Service.extend({
  store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  status: Ember.inject.service('status'),
  parseAuth: Ember.inject.service('parse-auth'),
  rawData: Ember.inject.service('raw-data'),
  onet: Ember.inject.service('onet'),
  answerString: function () {
    var answerString = "";
    this.get("store").peekAll('answer').forEach(function (item) {
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
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.get("onet").interestProfilerResults(answerString).then(function (data) {
          var results = [];
          data.forEach(function (item) {

            var r = store.peekRecord('scoreArea', item.id);
            if (r === null) {
              r = store.createRecord('scoreArea', item);
            }
            r.set("area", item.area);
            r.set("score", item.score);
            r.set("desc", item.desc);
            r.save();
            results.push(r);
          });
          resolve(results);
        },
        function(error) {
          reject(error);
        });
    });
  },
  updateCareerResults: function(answerString) {
    //This section fetches the career scores.
    var store = this.get("store");
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.get("onet").interestProfilerCareers(answerString).then(function (data) {
          data.forEach(function (item) {
            var record = store.peekRecord("onet-career", item.code);
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
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var promises = {
        results: that.updateProfilerResults(answerString),
        careers: that.updateCareerResults(answerString)
      };

      Ember.RSVP.hash(promises).then(function (hash) {
        //Success!
        that.get("settings").save("CalculatedAnswers", answerString);
        //This saves the current user answer string to Parse
        that.saveUserAnswers();
        resolve(true);
      }, function (reason) {
        //Failed to update all
        reject(reason);
      });
    });
  },

  saveUserAnswers: function() {
    if (this.get("parseAuth").loggedIn) {
      var answerString = this.answerString();
      this.get("parseAuth").user.set("answers", answerString);
      this.get("parseAuth").user.save();
    }
  },
  retakeQuiz: function() {
    //Erase old answers
    this.get("store").unloadAll('answer');

    this.saveUserAnswers();
    this.get("settings").save("answers", "");

    //reset the indicators
    this.get("settings").save("ProgressQuiz1", null);
    this.get("settings").save("ProgressQuiz2", null);
    this.get("settings").save("ProgressQuiz3", null);
  },
  populateLocalAnswers: function(answers) {
    if (this.get("parseAuth").loggedIn) {
      var store = this.get("store");
      var i = 0;
      while (i <= answers.length - 1) {
        var index = i + 1;
        var record = store.peekRecord("answer", index);
        if (record === null) {
          record = store.createRecord("answer", {
            id: index,
            question: store.peekRecord("question", index),
            selection: answers[i]
          });
        } else {
          record.set("question", index);
          record.set("selection", answers[i]);
        }
        record.save();
        i++;
      }
      this.get("settings").save("answers", answers);
    }
  },
  syncParseAnswers: function() {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (that.get("parseAuth").user !== null) {
        that.get("store").findAll("answer").then(function (data) {
          var parseAnswerString = that.get("parseAuth").user.get("answers") || "";
          var localAnswerString = that.answerString();
          
          if (localAnswerString.length < parseAnswerString.length) {
            that.populateLocalAnswers(parseAnswerString);
            return resolve(true);
          }

          if (localAnswerString.length > parseAnswerString.length) {
            that.get("parseAuth").user.set("answers", localAnswerString);
            that.get("parseAuth").user.save();
            return resolve(true);
          }

          //If lengths are the same, but contents is different
          if(localAnswerString !== parseAnswerString) {
            //todo: decide what to do here
            return resolve(true);
          }

          resolve(false);
        });
      } else {
        resolve(false);
      }
    });
  },
  populateHotOrNotFromParse: function() {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (that.get("parseAuth").loggedIn) {
        var hotAlumni = that.get("parseAuth").user.get("hotAlumni");
        var notAlumni = that.get("parseAuth").user.get("notAlumni");
        var hotOrNot = {};
        var id;


        for (id in hotAlumni) {
          if (hotAlumni.hasOwnProperty(id)) {
            hotOrNot[hotAlumni[id]] = {hot: true, "id": hotAlumni[id]};
          }
        }

        for (id in notAlumni) {
          if (notAlumni.hasOwnProperty(id)) {
            hotOrNot[notAlumni[id]] = {hot: false, "id": notAlumni[id]};
          }
        }

        var data = {};
        data[EmberENV.modelPaths.hotOrNot.modelName] = {};
        data[EmberENV.modelPaths.hotOrNot.modelName].records = hotOrNot;
        localforage.setItem(EmberENV.modelPaths.hotOrNot.emberDataNamespace, data).then(function () {
          resolve(hotOrNot);
        });
      } else {
        reject();
      }
    });
  },
  popuateBookmarkedPathwaysFromParse: function() {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (that.get("parseAuth").loggedIn) {
        var Ids = that.get("parseAuth").user.get("bookmarkedPathways");
        localforage.getItem(EmberENV.modelPaths.pathway.emberDataNamespace, function (err, data) {
          for (var i in Ids) {
            if (Ids.hasOwnProperty(i) && data[EmberENV.modelPaths.pathway.modelName].records.hasOwnProperty(Ids[i])) {
              data[EmberENV.modelPaths.pathway.modelName].records[Ids[i]]["bookmarked"] = true;
            }
          }
          localforage.setItem(EmberENV.modelPaths.pathway.emberDataNamespace, data).then(function () {
            resolve();
          });
        });
      } else {
        reject();
      }
    });
  },
  populateSettingsFromParse: function() {
    var that = this;
    //Skip importing these, either because they are handled with extra logic elsewhere
    //or because we don't want to sync them.
    var doNotImport = ["answers", "lastUpdatedDate", "demoSeen", "CalculatedAnswers"];
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (that.get("parseAuth").loggedIn) {
        var settings = that.get("parseAuth").user.get("settings") || {};
        if (settings.hasOwnProperty("lastUpdatedDate")) {
          delete settings.lastUpdatedDate;
        }
        localforage.getItem(EmberENV.modelPaths.setting.emberDataNamespace, function (err, data) {

          data = data || {};
          data[EmberENV.modelPaths.setting.modelName] = data[EmberENV.modelPaths.setting.modelName] || {};
          data[EmberENV.modelPaths.setting.modelName].records = data[EmberENV.modelPaths.setting.modelName].records || {};

          for (var id in settings) {
            if (settings.hasOwnProperty(id) && doNotImport.indexOf(id) === -1) {
              data[EmberENV.modelPaths.setting.modelName].records[id] = {"id": id, "value": settings[id]};
            }
          }
          localforage.setItem(EmberENV.modelPaths.setting.emberDataNamespace, data).then(function () {
            that.get("settings").setup().then(function() {
              resolve();
            });
          });
        });

      } else {
        reject();
      }
    });
  },
  syncParseUserData: function() {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (that.get("parseAuth").loggedIn) {
        var promises = {
          savedAnswerString: that.syncParseAnswers(),
          bookmarkedPathways: that.popuateBookmarkedPathwaysFromParse(),
          hotOrNot: that.populateHotOrNotFromParse(),
          settings: that.populateSettingsFromParse()
        };

        Ember.RSVP.hash(promises).then(function(updates) {
          resolve(updates);
        }, function() {
          resolve(false);
        });
      } else {
        resolve(false);
      }
    });
  },
  addItemToParseUserDataArray: function(arrayName, dataItem) {
    if (this.get("parseAuth").loggedIn) {
      var parseArray = this.get("parseAuth").user.get(arrayName);
      if(!parseArray) {
        parseArray = [];
      }
      if (parseArray.indexOf(dataItem) === -1) {
        parseArray.push(dataItem);
        this.get("parseAuth").user.set(arrayName, parseArray);
        this.get("parseAuth").user.save();
        return true;
      }
    }

    return false;
  },
  removeItemFromParseUserDataArray: function(arrayName, dataItem) {
    if (this.get("parseAuth").loggedIn) {
      var parseArray = this.get("parseAuth").user.get(arrayName);
      if(!parseArray) {
        parseArray = [];
      }
      var index = parseArray.indexOf(dataItem);
      if (index !== -1) {
        parseArray.slice(index, 1);
        this.get("parseAuth").user.set(arrayName, parseArray);
        this.get("parseAuth").user.save();
        return true;
      }
    }

    return false;
  },
  removeItemFromParseUserDataObject: function(objName, id) {
    if (this.get("parseAuth").loggedIn) {
      var obj = this.get("parseAuth").user.get(objName);

      if(!obj) {
        return false;
      }

      delete obj[id];

      this.get("parseAuth").user.set(objName, obj);
      this.get("parseAuth").user.save();
      return true;
    }
    return false;
  },
  addItemToParseUserDataObject: function(objName, id, data) {
    if (this.get("parseAuth").loggedIn) {
      var obj = this.get("parseAuth").user.get(objName);

      if(!obj) {
        obj = {};
      }

      obj[id] = data;

      this.get("parseAuth").user.set(objName, obj);
      this.get("parseAuth").user.save();
      return true;
    }
    return false;
  },
  dirtyAnswers: function() {
    var oldAnswerString = this.get("settings").CalculatedAnswers;
    var answerString = this.onetApiFormattedAnswerString();
    var scores = this.get("store").peekAll('scoreArea');

    return (scores.get("length") === 0 ||
    !oldAnswerString ||
    oldAnswerString !== answerString);
  },
  saveQuizAnswerToSettingsAndParse: function(answer) {
    var answerString = "";

    if (this.get("parseAuth").loggedIn) {
      answerString = this.get("parseAuth").user.get("answers");
    }

    if (answerString.length > answer.id) {
      answerString = answerString.substr(0, answer.id - 1) + answer.selection + answerString.substr(answer.id);
    } else if (answerString.length === answer.id - 1) {
      answerString = answerString + answer.selection;
    } else {
      answerString = this.answerString();
    }

    //Save the answers to local settings
    this.get("settings").save("answers", answerString);

    //Save the new answer string to Parse
    if (this.get("parseAuth").loggedIn) {
      this.get("parseAuth").user.set("answers", answerString);
      this.get("parseAuth").user.save();
    }
  }
});

export default profilerDataUtils;
