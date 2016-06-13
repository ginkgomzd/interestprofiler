import Ember from 'ember';

export default Ember.Component.extend({
  status: Ember.inject.service('status'),
  tagName: 'div',
  classNameBindings: ["status.cssLoading:fetching"],
  templateName: 'loading',
});
