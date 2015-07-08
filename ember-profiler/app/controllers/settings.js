import Ember from 'ember';

export default Ember.Controller.extend({
  user: function() {
    return this.settings.user;
  }.property("settings.user"),
  actions: {
    saveUser: function() {
      this.settings.save("user", this.get("user"));
      this.status.success("Changes Saved");
    }
  }
});
