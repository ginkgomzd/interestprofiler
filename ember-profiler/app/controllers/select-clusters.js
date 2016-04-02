import Ember from 'ember';

export default Ember.Controller.extend(Ember.SortableMixin, {
  pageTitle: "Wages and Salaries",
  navbarClass: "lightBlue",
  showBackButton: "ios",
  sortProperties: ['score', 'jobGrowth', 'salaryGrowth'],
  sortAscending: false,
  actions: {
    forwardToClusterDetail: function(clusterId) {
      this.transitionToRoute("cluster", clusterId);
    }
  }
});
