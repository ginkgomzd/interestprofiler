import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    this.store.find('occupation');
    return this.store.find('pathway', params.index);
  }
});
