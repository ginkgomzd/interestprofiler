import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    this.store.findAll('occupation');
    return this.store.findRecord('pathway', params.index);
  }
});
