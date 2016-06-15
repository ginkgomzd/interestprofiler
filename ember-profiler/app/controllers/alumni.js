import Ember from 'ember';

export default Ember.Controller.extend({
  profilerDataUtils: Ember.inject.service('profilerDataUtils'),
  pageTitle: "Alumni Network",
  navbarClass: "yellow",
  showBackButton: "never",
  actions: {
    /**
     * Action to record user preferences.
     *
     * @var hot boolean If true, the user wants to save the item; otherwise
     * the user wants to dismiss the item.
     */
    hotOrNot: function (hot) {
      var item = this.model, that = this, hotFlag = (hot === 1 || hot === true || hot === '1') ? true : false;
      //todo: Store these in Parse
      if(hotFlag) {
        this.get("profilerDataUtils").addItemToParseUserDataArray("hotAlumni", item.id);
        this.get("profilerDataUtils").removeItemFromParseUserDataArray("notAlumni", item.id);
      } else {
        this.get("profilerDataUtils").removeItemFromParseUserDataArray("hotAlumni", item.id);
        this.get("profilerDataUtils").addItemToParseUserDataArray("notAlumni", item.id);
      }
      this.store.findRecord('hotOrNot', item.id).then(function(record) {
        record.set("hot", hotFlag);
        record.save();
        that.send('navigateNext');
      }, function() {
        var record = that.store.createRecord("hotOrNot", {id: item.id, hot: hotFlag});
        record.save();
        that.send('navigateNext');
      });
    },
    toggleDescription: function() {
      Ember.$(".hotOrNotButtons, .alumniDescription").slideToggle();
    }
  },
  jobGrowth: function() {
    var pathway = this.get("model").get("pathway");
    if (pathway) {
      return pathway.get("jobGrowth");
    } else {
      return false;
    }
  }.property("model.pathway.jobGrowth"),
  salaryGrowth: function() {
    var pathway = this.get("model").get("pathway");
    if (pathway) {
      return pathway.get("salaryGrowth");
    } else {
      return false;
    }
  }.property("model.pathway.salaryGrowth"),
  showGrowth: function() {
    return !!(this.get("salaryGrowth") || this.get("jobGrowth"));
  }.property("salaryGrowth,jobGrowth")
});
