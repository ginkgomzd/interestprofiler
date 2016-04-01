import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'li',
  classNames: ["chevronRightDim"],
  templateName: 'cluster-button',
  tap: function(event) {
    if(event.target.tagName !== "I") {
      this.get("controller").send("forwardToClusterDetail", this.get("cluster").get("id"));
    }
  }
});
