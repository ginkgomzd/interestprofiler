import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.get("store").find('cluster', params.index).then(function(cluster) {
        cluster.get("pathways").then(function(pathways) {
          var promises = [];
          var occupationList = [];

          pathways.forEach( function(item) {
            promises.push(item.get("occupations").then(function(occupations) {
              occupationList += occupations;
            }));
          });

          Ember.RSVP.all(promises).then(function() {
            cluster.occupations = occupationList;
            resolve(cluster);
          });
        });
      });
    });
  }
});
