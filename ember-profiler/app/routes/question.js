import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('question', params.index);
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('questionOptions', this.store.all('questionOption'));
  },

  actions: {
    saveSelection: function() {
      var answer = {
        id: this.controller.get('model').get('id'),
        question: this.controller.get('model').get('id'),
        selection: this.controller.get('selectedAnswer')
      };
      this.store.push('answer', answer);
    }
  }
});
