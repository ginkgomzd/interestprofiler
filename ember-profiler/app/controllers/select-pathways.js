import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  allClusters: function() {
    return this.get('store').all('cluster');
  },
  selectedClusters: function() {
    var selected = [];
    var clusterID = 0;
    while (selected.length !== 3) {
      clusterID = Math.floor((Math.random() * 15) + 2);
      selected.push(this.get('store').find('cluster', clusterID));
    }
    return selected;
  }.property('allClusters.@each.selected'),
  pathways: function() {
    return this.get('store').all('pathway');
  }.property(),
});
