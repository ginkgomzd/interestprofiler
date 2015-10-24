import Ember from 'ember';

export default Ember.Controller.extend(Ember.SortableMixin, {
  rawData: Ember.inject.service('raw-data'),
  sortProperties: ['score'],
  sortAscending: false,
  selected: function() {
    return this.get('arrangedContent').filterProperty('is_selected', true);
  }.property('model.@each.is_selected', 'model.@each.score'),
  unselected: function() {
    return this.get('arrangedContent').filterProperty('is_selected', false);
  }.property('model.@each.is_selected', 'model.@each.score'),
  actions: {
    saveSelection: function() {
      var that = this;
      if (this.get("selected").get("length") === 3) {
        that.transitionToRoute('select-pathways');
      } else {
        if (this.get("selected").get("length") > 3 ) {
          this.modal.alert("You may only select 3 clusters");
        } else {
          this.modal.alert("You must select 3 clusters");
        }
      }
    },
    toggleClusterSelection: function(cluster) {
      var that = this;
      cluster.toggleProperty("is_selected");
      cluster.save();
      this.get("rawData").setValue("H2CMain", "cluster", cluster.get("id"), "is_selected", cluster.get("is_selected"));
      that.set("toggling", cluster.get("id"));
    }
  }
});
