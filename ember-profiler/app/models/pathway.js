import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  cluster: DS.belongsTo('cluster'),
  occupations: DS.hasMany('occupation'),
  bookmarked: DS.attr('boolean', {defaultValue: false}),
  score: function() {
    var occupations = this.get("occupations");
    var scores =  occupations.reduce(function(previousValues, occupation){
      var score = occupation.get("score");
      return {
        squares: previousValues.squares + (score * score),
        weights: previousValues.weights + score
      };
    }, {squares: 0, weights: 0});

    if (scores.weights === 0) {return 0;}

    return (scores.squares / scores.weights);
  }.property("occupations.@each.score")
});
