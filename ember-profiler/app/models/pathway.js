import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  cluster: DS.belongsTo('cluster'),
  occupations: DS.hasMany('occupation'),
  bookmarked: DS.attr('boolean', {defaultValue: false})
});
