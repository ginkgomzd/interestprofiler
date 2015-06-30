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
      console.log('controller::selectClusters::actions::saveSelection');
      this.transitionTo('select-pathways');
    },
    toggleClusterSelection: function(cluster) {
      cluster.toggleProperty("is_selected");
      cluster.save();
      this.set("toggling", cluster.get("id"));
    }
  }
});
