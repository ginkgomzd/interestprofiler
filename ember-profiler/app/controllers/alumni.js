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
    },

    navigateNext: function() {
      var next = 1 + parseInt(this.model.get('id'));
      if (next <= 2) {
        this.transitionToRoute('alumni', next);
      } else {
        var that = this;
        this.modal.confirm("you've reached the end of your reccomended alumni profiles. Continue to view careers that match your interestes.",
          {right: {text: "Continue", action: function() {
            that.transitionToRoute('select-clusters');
          }}});
      }
    },

  }
});
