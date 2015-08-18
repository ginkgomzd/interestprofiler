import DS from 'ember-data';

export default DS.Model.extend({
  pathway: DS.belongsTo('pathway'),
  cluster: DS.belongsTo('cluster'),
  name: DS.attr('string'),
  score: DS.attr('number', {defaultValue: 0})
});
