import DS from 'ember-data';

export default DS.Model.extend({
  hot: DS.attr('boolean'),
  item: DS.belongsTo('baseModel', {async: true, polymorphic: true})
});
