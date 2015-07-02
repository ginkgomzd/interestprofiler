import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'li',
  color: function() {
    return this.get("controller").get("colors")[this.pathway.get("clusterId").get("id")] || "";
  }.property(),
  classNameBindings: ["pathway.bookmarked:checked:unchecked", "color"],
});