import DS from 'ember-data';

export default DS.Model.extend({
  pathway: DS.belongsTo('pathway', { async: true }),
  title: DS.attr('string'),
  score: DS.attr('number', {defaultValue: 0}),
  awardDescription: DS.attr('string'),
  totalAwards: DS.attr('number', {defaultValue: 0}),
  wagePre2: DS.attr('number', {defaultValue: 0}),
  wagePost2: DS.attr('number', {defaultValue: 0}),
  wagePost5: DS.attr('number', {defaultValue: 0}),
  meridianPre2: DS.attr('number', {defaultValue: 0}),
  meridianPost2: DS.attr('number', {defaultValue: 0}),
  meridianPost5: DS.attr('number', {defaultValue: 0})
});
