import DS from 'ember-data';

export default DS.Model.extend({
  college: DS.attr('number'),
  title: DS.attr('string'),
  awardDescription: DS.attr('string')
});
