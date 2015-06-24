import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('question', params.index);
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('progress', (model.id % 20) === 0 ? 20 : model.id % 20);
    controller.set('questionOptions', this.store.all('questionOption'));
  },

  actions: {
    saveSelection: function(selectedAnswer) {
      var answer = {
        id: this.controller.get('model').get('id'),
        question: this.controller.get('model'),
        //selection: this.controller.get('selectedAnswer')
        selection: selectedAnswer
        //selection: this.store.find("questionOption", selectedAnswer)
      };
      var record = this.store.createRecord("answer", answer);
      record.save();
      this.send('navigateNextQuestion');
    },
    navigateNextQuestion: function() {
      var next = 1 + parseInt(this.controller.get('model').get('index'));
      if (next <= 60) {
        this.transitionTo('/question/' + next );
      } else {
        this.transitionTo('/results');
      }
    }
  }
});
