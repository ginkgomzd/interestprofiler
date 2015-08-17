import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  pathways: DS.hasMany('pathway'),
  occupations: DS.hasMany('occupation'),
  is_selected: DS.attr('boolean', {defaultValue: false}),
  score: function() {
    var pathways = this.get("pathways");
    return pathways.reduce(function(previousValue, pathway){
      return previousValue + pathway.get("score");
    }, 0);
  }.property("pathways.@each.score")
});
