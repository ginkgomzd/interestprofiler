import DS from 'ember-data';

export default DS.Model.extend({
  collegeName: DS.attr('string'),
  collegeURL: DS.attr('string'),
  address1: DS.attr('string'),
  address2: DS.attr('string'),
  city: DS.attr('string'),
  zip: DS.attr('number'),
  lat: DS.attr('number'),
  long: DS.attr('number'),
});
