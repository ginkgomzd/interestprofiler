import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      clusters: this.get('store').find('cluster', {is_selected: true}),
      allPathways: this.get('store').find('pathway')
    });
  }
});
