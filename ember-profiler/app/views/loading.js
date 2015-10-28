import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNameBindings: ["status.cssLoading:fetching"],
  templateName: 'loading',
});
