import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  allOccupations: function() {
    return this.get('store').all('occupation');
  },
  occupations: function() {
    var occupations = this.allOccupations();
    var pathwayId = this.get('model').get('id');
    return occupations.filter(function(occup){
          return (occup.get('pathwayId').get('id') === pathwayId);
        });
  }.property('allOccupations'),
  cluster: function() {
    var clusterId = this.get('model').get('clusterId');
    var cluster = this.get('store').find('cluster', clusterId.get('id'));
    console.dir(cluster);
    return cluster;
  }.property()
});
