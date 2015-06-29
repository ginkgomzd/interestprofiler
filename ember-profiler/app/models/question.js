import DS from 'ember-data';

export default DS.Model.extend({
  area: DS.attr('string'),
  text: DS.attr('string')
});
