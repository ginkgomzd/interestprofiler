import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      clusters: this.get('store').find('cluster', {"in": this.get("settings").load("selectedClusters")})
      //allPathways: this.get('store').find('pathway')
    });
  }
});
