import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNameBindings: ["settings.fetchingResults:fetching"],
  templateName: 'loading',
});
