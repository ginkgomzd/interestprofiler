import Ember from 'ember';

export default Ember.Route.extend({
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
  model: function(params, transition) {

    if (params.index == 0) { // jshint ignore:line
      var localAnswerString = this.get("profilerDataUtils").answerString();
      
      if (localAnswerString.length > 0 && localAnswerString.length < 60) {
        return this.transitionTo('question', localAnswerString.length + 1);
      }
      if (localAnswerString.length === 60) {
        this.get("profilerDataUtils").retakeQuiz();
      }
      return this.transitionTo('question', 1);
    }

    return this.get("store").find('question', params.index);
  },
  actions: {
    makeSelection: function(selectedAnswer) {
      var that = this;
      Ember.$(".answers .answer" + selectedAnswer).animate({backgroundColor: Ember.$.Color({ alpha: 0.3 })}, 200, function() {
          Ember.$(".answers .answer" + selectedAnswer).animate({backgroundColor: Ember.$.Color({ alpha: 0 })}, 200, function() {
            that.send("saveSelection", selectedAnswer);
          });
      });
    },
    saveSelection: function(selectedAnswer) {
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
      record.save();

      this.get("profilerDataUtils").saveAnswerToParse(answer);

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
      var next = 1 + parseInt(this.controller.get('model').get('index'));
      if (next <= 60) {
        this.get("status").loading();
        this.transitionTo('question', next);
      } else {
        this.transitionTo('results');
      }
    },
    executeBackAction: function() {
      //Todo: CCC-187 Unset last answer made
      //returning true will cause the action to bubble and return us to previous screen.
      return true;
    }
  }
});
