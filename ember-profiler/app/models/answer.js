import DS from 'ember-data';

export default DS.Model.extend({
  selection: DS.belongsTo('questionOption'),
  question: DS.belongsTo('question')
});
