import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['mainProgress'],
  settings: Ember.inject.service('settings'),
});
