import Ember from 'ember';

export default Ember.Controller.extend(Ember.SortableMixin, {
  sortProperties: ['score', 'jobGrowth', 'salaryGrowth'],
  sortAscending: false,
  actions: {
    forwardToClusterDetail: function(clusterId) {
      this.transitionToRoute("cluster", clusterId);
    }
  }
});