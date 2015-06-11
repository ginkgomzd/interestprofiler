import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  pathways: DS.hasMany('pathway'),
  occupations: DS.hasMany('occupation'),
  is_selected: DS.attr('boolean')
});
