import DS from 'ember-data';

export default DS.Model.extend({
  hot: DS.belongsTo('hotOrNot')
});
