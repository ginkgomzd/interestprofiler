import DS from 'ember-data';

export default DS.Model.extend({
  pathway: DS.belongsTo('pathway'),
  score: DS.attr('number', {defaultValue: 0})
});
