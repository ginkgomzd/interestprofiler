import Ember from 'ember';

export default Ember.Controller.extend({
  selected: function() {
    return this.get('model').filterProperty('is_selected', true);
  }.property('model.@each.is_selected'),
  unselected: function() {
    return this.get('model').filterProperty('is_selected', false);
  }.property('model.@each.is_selected'),

  actions: {
    saveSelection: function() {
      if (this.get("selected").get("length") === 3) {
        this.transitionToRoute('select-pathways');
      } else {
        if (this.get("selected").get("length") > 3 ) {
          this.modal.alert("You may only select 3 clusters");
        } else {
          this.modal.alert("You must select 3 clusters");
        }
      }
    },
    toggleClusterSelection: function(cluster) {
      cluster.toggleProperty("is_selected");
      cluster.save();
      this.set("toggling", cluster.get("id"));
    }
  }
});
