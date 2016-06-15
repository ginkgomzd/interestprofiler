import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      clusters: this.get('store').query('cluster', {"in": this.get("settings").load("selectedClusters")})
      //allPathways: this.get('store').findAll('pathway')
    });
  }
});
