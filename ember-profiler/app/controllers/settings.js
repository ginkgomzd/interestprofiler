import Ember from 'ember';

export default Ember.Controller.extend({
  attributes: ["email", "firstName", "lastName", "age", "location", "education"],
  user: function() {
    var user = {};
    for (var i in this.attributes) {
      user[this.attributes[i]] = this.parseAuth.user.get(this.attributes[i]);
    }
    return user;
  }.property("parseAuth.user"),
  actions: {
    saveUser: function() {
      var user = this.get("user");
      for (var i in this.attributes) {
        this.parseAuth.user.set(this.attributes[i], user[this.attributes[i]]);
      }
      var that = this;
      this.parseAuth.user.save(null, {
        success: function() {
          that.status.success("Changes Saved");
        },
        error: function(error) {
          that.status.error(error.message);
        }
      });
    }
  }
});
