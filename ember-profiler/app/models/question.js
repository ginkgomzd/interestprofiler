import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr('number'),
  area: DS.attr('string'),
  text: DS.attr('string')
});
