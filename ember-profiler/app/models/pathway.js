import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  cluster: DS.belongsTo('cluster', { async: true }),
  occupations: DS.hasMany('occupation', { async: true }),
  onetCareers: DS.hasMany('onet-career', { async: true }),
  jobGrowth: DS.attr('boolean', {defaultValue: false}),
  salaryGrowth: DS.attr('boolean', {defaultValue: false}),
  bookmarked: DS.attr('boolean', {defaultValue: false}),
  score: function() {
    var onetCareers = this.get("onetCareers");
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
