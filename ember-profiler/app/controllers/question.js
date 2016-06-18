import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  settings: Ember.inject.service('settings'),
  status: Ember.inject.service('status'),
  sortingDesc: ['value:desc'],
  showBackButton: "never",
  backButtonText: "Back",
  pageTitle: "Quiz",
  navbarClass: "yellow",
  progress: function() {
    //This hides the loading spinner.
    this.get("status").loadingComplete();
    return (this.get('model').id % 20) === 0 ? 20 : this.get('model').id % 20;
  }.property("model"),
  allQuestionOptions: function() {
    return this.get("store").findAll('questionOption');
  }.property(),
  questionOptions: Ember.computed.sort('allQuestionOptions', 'sortingDesc')
});
