import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  desc: DS.attr('string'),
  //Old image field
  //img: DS.attr('string'),
  image: DS.belongsTo("image", { async: true }),
  pathway: DS.belongsTo('pathway', { async: true }),
});
