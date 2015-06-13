import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  clusterId: DS.belongsTo('cluster'),
  occupations: DS.hasMany('occupation')
});
