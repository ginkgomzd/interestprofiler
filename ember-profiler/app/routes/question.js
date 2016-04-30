import Ember from 'ember';

export default Ember.Route.extend({
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
  goingBack: false,
  model: function(params, transition) {
    if (params.index == 0) { // jshint ignore:line
      this.set("goingBack", false);
      var localAnswerString = this.get("profilerDataUtils").answerString();
      
      if (localAnswerString.length > 0 && localAnswerString.length < 60) {
        return this.transitionTo('question', localAnswerString.length + 1);
      }
      if (localAnswerString.length === 60) {
        this.get("profilerDataUtils").retakeQuiz();
      }
      return this.transitionTo('question', 1);
    } else if (this.get("goingBack")) {
      var that = this;
      this.get("store").find('answer', params.index).then(function(answer) {
        answer.destroyRecord().finally(function() {
          that.get("profilerDataUtils").saveUserAnswers();
        });
        that.set("goingBack", false);
      }, function() {
        that.set("goingBack", false);
      });
    }
    alert("Loading Question: " + params.index);
    return this.get("store").find('question', params.index);
  },
  actions: {
    makeSelection: function(selectedAnswer) {
      var that = this;
      alert("Selection click registered");
      Ember.$(".answers .answer" + selectedAnswer).animate({backgroundColor: Ember.$.Color({ alpha: 0.3 })}, 150, function() {
          Ember.$(".answers .answer" + selectedAnswer).animate({backgroundColor: Ember.$.Color({ alpha: 0 })}, 150, function() {
            alert("Animation Complete");
            that.send("saveSelection", selectedAnswer);
          });
      });
    },
    saveSelection: function(selectedAnswer) {
      alert("entering selection");
      var answer = {
        id: this.controller.get('model').get('id'),
        question: this.controller.get('model'),
        selection: selectedAnswer
      };
      var record = this.store.getById("answer", answer.id);
      if (record === null) {
        record = this.store.createRecord("answer", answer);
      } else {
        record.set("question", answer.question);
        record.set("selection", answer.selection);
      }
      alert("answer saved");
      record.save();

      alert("persist answer to cloud storage");
      this.get("profilerDataUtils").saveAnswerToParse(answer);

      alert("Persist Complete");
      if(answer.id % 20 === 0) {
        this.send('sectionComplete');
      } else {
        this.send('navigateNextQuestion');
      }
    },
    sectionComplete: function() {
      var section = parseInt(this.controller.get('model').get('index')) / 20;
      this.settings.save("ProgressQuiz" + section, "complete");
      Ember.$(".sectionComplete").slideDown();
    },
    acknowledgeSectionComplete: function() {
      Ember.$(".sectionComplete").slideUp();
      this.send('navigateNextQuestion');
    },
    navigateNextQuestion: function() {
      alert("progress");
      var next = 1 + parseInt(this.controller.get('model').get('index'));
      alert("Attempting to progress to question: " + next);
      if (next <= 60) {
        alert("show spinner");
        this.get("status").loading();
        alert("leaving page");
        this.transitionTo('question', next);
      } else {
        this.transitionTo('results');
      }
    },
    executeBackAction: function() {
      //Todo: CCC-187 Unset last answer made
      this.set("goingBack", true);
      //returning true will cause the action to bubble and return us to previous screen.
      return true;
    }
  }
});
