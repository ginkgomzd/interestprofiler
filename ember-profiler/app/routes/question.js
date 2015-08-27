import Ember from 'ember';

export default Ember.Route.extend({
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
  model: function(params) {

    if (params.index == 0) { // jshint ignore:line
      var localAnswerString = this.get("profilerDataUtils").answerString();
      if (localAnswerString.length > 0) {
        return this.transitionTo('question', localAnswerString.length + 1);
      }
      return this.transitionTo('question', 1);
    }

    return this.store.find('question', params.index);
  },
  actions: {
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

      //Save the selected answer to Parse
      var answerString = this.parseAuth.user.get("answers");
      if (answerString.length > answer.id) {
        answerString = answerString.substr(0, answer.id - 1) + answer.selection + answerString.substr(answer.id);
      } else if (answerString.length === answer.id - 1) {
        answerString = answerString + answer.selection;
      } else {
        answerString = this.get("profilerDataUtils").answerString();
      }
      this.parseAuth.user.set("answers", answerString);
      this.settings.set("answers", answerString);
      this.parseAuth.user.save();

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
        this.transitionTo('question', next);
      } else {
        this.transitionTo('results');
      }
    },
    goBack: function() {
      var prev = parseInt(this.controller.get('model').get('index')) - 1;
      if (prev > 0) {
        this.transitionTo('question', prev );
      }
    }
  }
});
