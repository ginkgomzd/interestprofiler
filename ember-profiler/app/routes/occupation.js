import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {
      "occupation": this.store.find('occupation', params.index),
      "programs": this.store.find('program', {"occupation": params.index}),
    };
  }
});
