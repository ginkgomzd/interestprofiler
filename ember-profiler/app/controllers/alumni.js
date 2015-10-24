import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    /**
     * Action to record user preferences.
     *
     * @var hot boolean If true, the user wants to save the item; otherwise
     * the user wants to dismiss the item.
     */
    hotOrNot: function (hot) {
      var item = this.model, that = this, hotFlag = (hot === 1 || hot === true || hot === '1') ? true : false;
      this.store.find('hotOrNot', item.id).then(function(record) {
        record.set("hot", hotFlag);
        record.save();
        that.send('navigateNext');
      }, function() {
        var record = that.store.createRecord("hotOrNot", {id: item.id, hot: hotFlag});
        record.save();
        that.send('navigateNext');
      });
    }
  }
});
