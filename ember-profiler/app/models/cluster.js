import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  pathways: DS.hasMany('pathway'),
  occupations: DS.hasMany('occupation'),
  is_selected: DS.attr('boolean', {defaultValue: false}),
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
  }.property("pathways.@each.score")
});
