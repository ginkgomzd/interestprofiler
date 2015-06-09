import DS from 'ember-data';

export default DS.Model.extend({
  index: DS.attr('number'),
  area: DS.attr('string'),
  text: DS.attr('string')
});
