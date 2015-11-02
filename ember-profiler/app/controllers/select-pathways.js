import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  sortingDesc: ['bookmarked:desc', 'score:desc', 'jobGrowth:desc', 'salaryGrowth:desc', 'name:asc'],
  pathwaysList: function() {
    var pathways = Ember.A();
    this.get("model").clusters.forEach(function(item) {
      pathways.pushObjects(item.get('pathways').toArray());
    });
    return pathways;
  }.property("model.clusters.@each"),
  pathways: Ember.computed.sort('pathwaysList', 'sortingDesc'),
  colors: function() {
    var colorList = {};
    var colorLookup = ["blue", "red", "yellow"];
    this.get("model").clusters.forEach(function (item, index) {
      colorList[item.get("id")] = colorLookup[index] || null;
    });
    return colorList;
  }.property("model.clusters"),
  actions: {
    toggleBookmark: function(pathway) {
      pathway.toggleProperty("bookmarked");
      pathway.save();
    }
  }
});
