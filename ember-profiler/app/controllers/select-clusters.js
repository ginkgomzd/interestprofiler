import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  all: function() {
    return this.get('store').all('cluster');
  },
  unselected: function() {
    var clusters = this.all();
    return clusters.filter(function(cluster){
          return !cluster.selected;
        });
  }.property('all.@each.selected'),
  selected: function() {
    var selected = [];
    var clusterID = 0;
    while (selected.length !== 3) {
      clusterID = Math.floor((Math.random() * 15) + 2);
      selected.push(this.get('store').find('cluster', clusterID));
    }
    return selected;
  }.property('all.@each.selected')
});
