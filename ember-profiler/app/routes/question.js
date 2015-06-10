import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('question', params.index);
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('questionOptions', this.store.all('questionOption'));
  }
});
