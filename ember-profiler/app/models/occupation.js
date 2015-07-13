import DS from 'ember-data';

export default DS.Model.extend({
  code: DS.attr('string'),
  pathway: DS.belongsTo('pathway'),
  cluster: DS.belongsTo('cluster'),
  name: DS.attr('string')
});
