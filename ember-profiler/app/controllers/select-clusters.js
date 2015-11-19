import Ember from 'ember';

export default Ember.Controller.extend(Ember.SortableMixin, {
  sortProperties: ['score'],
  sortAscending: false,
  selected: function() {
    var selectedClusters = this.get("settings").load("selectedClusters") || [];
    return this.get('arrangedContent').filter(function(item, index, enumerable){
      return selectedClusters.indexOf(item.id) !== -1;
    });
  }.property("settings.selectedClusters"),
  unselected: function() {
    var selectedClusters = this.get("settings").load("selectedClusters") || [];
    return this.get('arrangedContent').filter(function(item, index, enumerable){
      return selectedClusters.indexOf(item.id) === -1;
    });
  }.property("settings.selectedClusters"),
  actions: {
    saveSelection: function() {
      if (this.get("selected").get("length") > 3 ) {
        this.modal.alert("You may only select 3 clusters");
      } else if(this.get("selected").get("length") < 1) {
        this.modal.alert("You must select at least 1 cluster");
      } else {
        this.transitionToRoute('select-pathways');
      }
    },
    toggleClusterSelection: function(clusterId) {
      var selectedClusters = this.get("settings").load("selectedClusters") || [];
      var index = selectedClusters.indexOf(clusterId);
      this.set("toggling", clusterId);
      if(index === -1) {
        //select it
        selectedClusters.push(clusterId);
      } else {
        //unselect it
        selectedClusters.splice(index, 1);
      }
      this.get("settings").save("selectedClusters", selectedClusters);
    }
  }
});