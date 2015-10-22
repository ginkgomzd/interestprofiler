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
      var hotFlag = (hot === 1 || hot === true || hot === '1') ? true : false;
      var item = this.model;
      this.store.push('hotOrNot', {
        // this needs work... temporarily hardcoding an ID...
        id: 5,
        hot: hotFlag,
        item: item
      });

      this.send('navigateNext');
    }
  }
});
