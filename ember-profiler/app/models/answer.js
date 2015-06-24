import DS from 'ember-data';

export default DS.Model.extend({
  selection: DS.attr('number'),
  question: DS.belongsTo('question')
});
