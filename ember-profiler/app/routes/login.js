import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    loginWithFacebook: function() {
      var that = this;
      this.parseAuth.authenticate_fb(function() {
        that.transitionTo("welcome");
      },
      function(user, error) {
        console.log(error);
      });

    },
    loginWithLinkedIn: function() {this.status.error("This hasn't been implemented yet");},
    loginWithTwitter: function() {this.status.error("This hasn't been implemented yet");},
    loginWithGoogle: function() {this.status.error("This hasn't been implemented yet");}
  }
});
