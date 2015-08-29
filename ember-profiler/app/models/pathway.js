import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  cluster: DS.belongsTo('cluster'),
  occupations: DS.hasMany('occupation'),
  onetCareers: DS.hasMany('onet-career'),
  bookmarked: DS.attr('boolean', {defaultValue: false}),
  score: function() {
    var onetCareers = this.get("onet-career");
    var scores =  onetCareers.reduce(function(previousValues, career){
      var score = career.get("score");
      return {
        squares: previousValues.squares + (score * score),
        weights: previousValues.weights + score
      };
    }, {squares: 0, weights: 0});

    if (scores.weights === 0) {return 0;}

    return (scores.squares / scores.weights);
  }.property("onetCareers.@each.score")
});
