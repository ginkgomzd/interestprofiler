import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'label',
  classNames: ["checkbox"],
  color: function() {
    return this.get("controller").get("colors")[this.pathway.get("clusterId").get("id")] || "";
  }.property(),
  classNameBindings: ["pathway.bookmarked:checked:unchecked", "color"],
  templateName: 'pathway-checkbox',
  press: function() {
    this.pathway.toggleProperty("bookmarked");
    this.pathway.save();
  }
});
