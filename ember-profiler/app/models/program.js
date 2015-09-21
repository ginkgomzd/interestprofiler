import DS from 'ember-data';

export default DS.Model.extend({
  occupation: DS.hasMany('occupation'),
  collegeName: DS.attr('string'),
  collegeUrl: DS.attr('string'),
  title: DS.attr('string'),
  awardDescription: DS.attr('string')
});
