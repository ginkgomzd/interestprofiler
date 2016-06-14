import Ember from 'ember';

export default Ember.Controller.extend({
  pageTitle: "Wages and Salaries",
  navbarClass: "lightBlue",
  showBackButton: "ios",
  sortBy: ['score:desc', 'jobGrowth:desc', 'salaryGrowth:desc'],
  clusters: Ember.computed.sort("model", "sortBy"),
  actions: {
    forwardToClusterDetail: function(clusterId) {
      this.transitionToRoute("cluster", clusterId);
    }
  }
});
