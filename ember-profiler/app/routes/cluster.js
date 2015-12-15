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
            promises.push(that.store.find("occupation", {"pathway": item.id}).then(function(occupations) {
              //console.log(occupations.toArray());
              occupationList = occupationList.concat( occupations.toArray() );
            }));
          });

          Ember.RSVP.all(promises).then(function() {
            console.log(occupationList);
            cluster.occupations = occupationList;
            resolve(cluster);
          });
        });
      });
    });
  }
});
