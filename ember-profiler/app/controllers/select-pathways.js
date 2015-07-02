import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  pathways: function() {
    var pathways = Ember.A();
    this.get('model').forEach(function(item) {
      pathways.pushObjects(item.get('pathways').toArray());
    });
    return pathways;
  }.property(),
  colors: function() {
    var colorList = {};
    var colorLookup = ["blue", "red", "yellow"];
    this.get("model").forEach(function (item, index) {
      colorList[item.get("id")] = colorLookup[index] || null;
    });
    return colorList;
  }.property("model")
});
