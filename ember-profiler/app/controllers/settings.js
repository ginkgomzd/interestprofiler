import Ember from 'ember';

export default Ember.Controller.extend({
  status: Ember.inject.service('status'),
  parseAuth: Ember.inject.service('parse-auth'),
  attributes: ["email", "firstName", "lastName", "age", "location", "education"],
  user: function() {
    var user = {};
    if (this.get("parseAuth").loggedIn) {
      for (var i in this.attributes) {
        user[this.attributes[i]] = this.get("parseAuth").user.get(this.attributes[i]);
      }
    }
    return user;
  }.property("parseAuth.user"),
  actions: {
    saveUser: function() {
      if (this.get("parseAuth").loggedIn) {
        var user = this.get("user");
        for (var i in this.attributes) {
          this.get("parseAuth").user.set(this.attributes[i], user[this.attributes[i]]);
        }
        var that = this;
        this.get("parseAuth").user.save(null, {
          success: function () {
            that.get("status").success("Changes Saved");
          },
          error: function (error) {
            that.get("status").error(error.message);
          }
        });
      }
    },
    gotoLogin: function() {
      this.transitionToRoute("login");
    }
  }
});
