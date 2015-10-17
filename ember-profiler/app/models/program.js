import DS from 'ember-data';

export default DS.Model.extend({
  //occupation: DS.hasMany('occupation', { async: true }),
  //occupation: DS.hasMany('occupation', { async: true }),
  //collegeName: DS.attr('string'),
  //collegeUrl: DS.attr('string'),
  college: DS.attr('number'),
  title: DS.attr('string'),
  awardDescription: DS.attr('string')
});
