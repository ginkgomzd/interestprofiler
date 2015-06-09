import DS from 'ember-data';

export default DS.Model.extend({
  index: DS.attr('number'), // not sure we need this; Ember reserves the ID so we're using this instead of an ID
  area: DS.attr('string'),
  text: DS.attr('string')
});
