import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  pathways: DS.hasMany('pathway', { async: true }),
  score: function() {
    var pathways = this.get("pathways");
    var scores = pathways.reduce(function(previousValues, pathway){
      var score = pathway.get("score");
      return {
        squares: previousValues.squares + (score * score),
        weights: previousValues.weights + score
      };
    }, {squares: 0, weights: 0});

    if (scores.weights === 0) {return 0;}

    return (scores.squares / scores.weights);
  }.property("pathways.@each.score"),
  jobGrowth: function() {
    var pathways = this.get("pathways");
    return pathways.reduce(function(previousValues, pathway){
      return pathway.get("jobGrowth") || previousValues;
    });
  }.property("pathways.@each.jobGrowth"),
  salaryGrowth: function() {
    var pathways = this.get("pathways");
    return pathways.reduce(function(previousValues, pathway){
      return pathway.get("salaryGrowth") || previousValues;
    });
  }.property("pathways.@each.salaryGrowth")
});
