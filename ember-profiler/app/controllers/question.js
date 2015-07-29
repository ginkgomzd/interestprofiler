import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  sortingDesc: ['value:desc'],
  progress: function() {
    return (this.get('model').id % 20) === 0 ? 20 : this.get('model').id % 20;
  }.property("model"),
  allQuestionOptions: function() {
    return this.store.all('questionOption');
  }.property(),
  questionOptions: Ember.computed.sort('allQuestionOptions', 'sortingDesc')
});
