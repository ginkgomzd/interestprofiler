import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (this.parseAuth.loggedIn) {
      this.transitionTo("welcome");
    }
  },
  actions: {
    loginWithFacebook: function() {
      var that = this;
      this.parseAuth.authenticate_fb(function() {
        that.transitionTo("welcome");
      },
      function(user, error) {
        that.status.warn(error.message);
      });

    },
    loginWithLinkedIn: function() {this.status.warn("This hasn't been implemented yet");},
    loginWithTwitter: function() {this.status.warn("This hasn't been implemented yet");},
    loginWithGoogle: function() {this.status.warn("This hasn't been implemented yet");},
    doLogin: function() {
      var that = this;
      var user = {
        email: Ember.$("#login-email").val(),
        password: Ember.$("#login-password").val()
      };
      this.parseAuth.authenticate(user,
        function() {
          //success
          that.transitionTo("welcome");
        },
        function(user, error) {
          that.status.warn(error.message);
        });
    },
    doSignup: function() {
      var user = {
        email: Ember.$("#login-email").val(),
        password: Ember.$("#login-password").val()
      };
      if (Ember.$("#login-password-confirm").val() === user.password) {
        var that = this;
        this.parseAuth.register(user,
          function() {
            //success
            that.transitionTo("welcome");
          },
          function(user, error) {
            that.status.warn(error.message);
          });
      } else {
        this.status.warn("Passwords don't match");
      }
    },
    showSignup: function() {
      Ember.$("#login-actions").slideUp();
      Ember.$("#signup-actions").slideDown();
      Ember.$("#login-password-confirm").slideDown();
      Ember.$("#login-password-confirm").css("display", "block");
    },
    cancelSignup: function() {
      Ember.$("#login-actions").slideDown();
      Ember.$("#signup-actions").slideUp();
      Ember.$("#login-password-confirm").slideUp();
    },
  }
});
