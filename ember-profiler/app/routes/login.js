import Ember from 'ember';

export default Ember.Route.extend({
  setupUtils: Ember.inject.service('setup'),
  beforeModel: function() {
    if (this.parseAuth.loggedIn) {
      this.transitionTo("welcome");
    }
  },
  registerLoginLocationAnalytics: function(method) {
    var that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        that.send("analytics", "loginLocation", {latitude: "" + position.coords.latitude, longitude: "" + position.coords.longitude, "method": method});
      });
    }
  },
  actions: {
    loginWithFacebook: function() {
      var that = this;
      this.parseAuth.authenticate_fb(function() {
        that.registerLoginLocationAnalytics("facebook");
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
          that.get("setupUtils").handleLogin().then(function() {
            that.registerLoginLocationAnalytics("email");
            that.transitionTo("welcome");
          });
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
              that.get("setupUtils").handleLogin().then(function() {
                that.registerLoginLocationAnalytics("email-signup");
                that.transitionTo("welcome");
            });
          },
          function(user, error) {
            that.status.warn(error.message);
          });
      } else {
        this.status.warn("Passwords don't match");
      }
    },
    doReset: function() {
      if (Ember.$("#login-email").val()) {

        var that = this;
        this.parseAuth.passwordReset(Ember.$("#login-email").val(), {
          success: function () {
            that.status.success("An email with reset instructions has been sent to '" + Ember.$("#login-email").val() + "'");
            that.send("cancelReset");
          },
          error: function (error) {
            that.status.error(error.message);
          }
        });
      } else {
        this.status.warn("You must supply your email address to reset your password.");
      }
    },
    showReset: function() {
      Ember.$("#login-actions, #login-password").slideUp();
      Ember.$("#reset-actions").slideDown();
    },
    cancelReset: function() {
      Ember.$("#login-actions, #login-password").slideDown();
      Ember.$("#reset-actions").slideUp();
      Ember.$("#login-password").css("display", "block");
    },
    showSignup: function() {
      Ember.$("#login-actions, #reset-actions").slideUp();
      Ember.$("").slideDown();
      Ember.$("#signup-actions, #login-password-confirm").slideDown();
      Ember.$("#login-password-confirm").css("display", "block");
    },
    cancelSignup: function() {
      Ember.$("#login-actions").slideDown();
      Ember.$("#signup-actions, #login-password-confirm").slideUp();
    },
  }
});
