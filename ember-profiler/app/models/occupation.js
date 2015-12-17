import DS from 'ember-data';

export default DS.Model.extend({
  pathway: DS.belongsTo('pathway', { async: true }),
  title: DS.attr('string'),
  score: DS.attr('number', {defaultValue: 0}),
  topCode: DS.attr('number'),
  awardDescription: DS.attr('string'),
  totalAwards: DS.attr('number', {defaultValue: 0}),
  wageCountPre2: DS.attr('number', {defaultValue: 0}),
  wageCountPost2: DS.attr('number', {defaultValue: 0}),
  wageCountPost5: DS.attr('number', {defaultValue: 0}),
  medianPre2: DS.attr('number', {defaultValue: 0}),
  medianPost2: DS.attr('number', {defaultValue: 0}),
  medianPost5: DS.attr('number', {defaultValue: 0}),
  programs: DS.hasMany('program', { async: true }),
  hasWageData: function() {
    return ((this.get("medianPre2") && this.get("medianPre2") != "0") ||
    (this.get("medianPost2") && this.get("medianPost2") != "0") ||
    (this.get("medianPost5") && this.get("medianPost5") != "0"));
  }.property("medianPre2,medianPost2,medianPost5")
});
