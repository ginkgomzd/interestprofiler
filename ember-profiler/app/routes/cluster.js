import Ember from 'ember';

export default Ember.Route.extend({
  modal: Ember.inject.service('modal'),
  showHelp: function() {
    this.get("modal").alert("Use the buttons on the top to sort by wages, your quiz results, or alphabetically. Wages show what you can expect to earn two years before, two years after, and five years after getting a degree.");
  }.on("init"),
  model: function(params) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.get("store").findRecord('cluster', params.index).then(function(cluster) {
        cluster.get("pathways").then(function(pathways) {
          var promises = [];
          var occupationList = [];

          pathways.forEach( function(item) {
            promises.push(that.store.query("occupation", {"pathway": item.id}).then(function(occupations) {
              occupations = occupations.toArray();
              var i = 0;
              while(i < occupations.length) {
                var rowHasData = true;
                if(occupations.hasOwnProperty(i)) {
                  if (occupations.hasOwnProperty(i + 1)) {
                    if (occupations[i].get("title") ===  occupations[i + 1].get("title")) {
                      // Collapse Degree and Certificate Programs with the same Occupation title:
                      rowHasData = (occupations[i].get("hasWageData") || occupations[i + 1].get("hasWageData"));
                      var higherSalary = Math.max(occupations[i].get("medianPost5"), occupations[i + 1].get("medianPost5"));
                      occupationList.push({first: occupations[i], second: occupations[i + 1], hasData: rowHasData, salary: higherSalary});
                      i++;
                    } else {
                      rowHasData = occupations[i].get("hasWageData");

                      occupationList.push({first: occupations[i], hasData: rowHasData, salary: occupations[i].get("medianPost5")});
                    }
                  } else {
                    rowHasData = occupations[i].get("hasWageData");
                    occupationList.push({first: occupations[i], hasData: rowHasData, salary: occupations[i].get("medianPost5")});
                  }
                }
                i++;
              }
            }));
          });

          Ember.RSVP.all(promises).then(function() {
            cluster.set("occupations", occupationList);
            resolve(cluster);
          });
        });
      });
    });
  }
});
