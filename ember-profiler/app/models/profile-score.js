import DS from 'ember-data';

export default DS.Model.extend({
  area: DS.attr('string'),
  score: DS.attr('number'),
  desc: DS.attr('string')
});
