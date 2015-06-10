import DS from 'ember-data';

export default DS.Model.extend({
  code: DS.attr('string'),
  pathwayId: DS.belongsTo('pathway'),
  clusterId: DS.belongsTo('cluster'),
  name: DS.attr('string')
});
