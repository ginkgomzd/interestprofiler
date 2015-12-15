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
              occupations = occupations.toArray();
              var i = 0;
              while(i < occupations.length) {
                var rowHasData = true;
                if(occupations.hasOwnProperty(i)) {
                  if (occupations.hasOwnProperty(i + 1)) {
                    if (occupations[i].get("title") ===  occupations[i + 1].get("title")) {
                      rowHasData = (occupations[i].get("hasWageData") || occupations[i + 1].get("hasWageData"));
                      occupationList.push({first: occupations[i], second: occupations[i + 1], hasData: rowHasData});
                      i++;
                    } else {
                      rowHasData = occupations[i].get("hasWageData");
                      occupationList.push({first: occupations[i], hasData: rowHasData});
                    }
                  } else {
                    rowHasData = occupations[i].get("hasWageData");
                    occupationList.push({first: occupations[i], hasData: rowHasData});
                  }
                }
                i++;
              }
            }));
          });

          Ember.RSVP.all(promises).then(function() {
            cluster.occupations = occupationList;
            resolve(cluster);
          });
        });
      });
    });
  },
  actions: {
    viewOccupation: function(occupationId) {
      this.transitionTo("occupation", occupationId);
    }
  }
});
