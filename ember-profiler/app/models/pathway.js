import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  cluster: DS.belongsTo('cluster'),
  occupations: DS.hasMany('occupation'),
  bookmarked: DS.attr('boolean', {defaultValue: false}),
  score: function() {
    var occupations = this.get("occupations");
    return occupations.reduce(function(previousValue, occupation){
      return previousValue + occupation.get("score");
    }, 0);
  }.property("occupations.@each.score")
});
