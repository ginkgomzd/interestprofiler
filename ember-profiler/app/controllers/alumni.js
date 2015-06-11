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
      var id = this.model.get('id');
      if (hot === 1 || hot === true || hot === '1') {
        console.log('save ' + id);
      } else {
        console.log('dismiss ' + id);
      }
      this.send('navigateNext');
    },

    navigateNext: function() {
      var next = 1 + this.model.get('id');
      if (next <= 2) {
        this.transitionTo('alumni' + next );
      } else {
        this.transitionTo('select-clusters');
      }
    },

  }
});
