import Ember from 'ember';

export default Ember.Route.extend({
  setupUtils: Ember.inject.service('setup'),
  status: Ember.inject.service('status'),
  dateHelper: Ember.inject.service('date-functions'),
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
  verifyAge: function() {
    var valid = Ember.$("#ageVerificationCheckbox").is(":checked");
    if(!valid) {
      this.get("status").warn("You must be at least 13 years of age to create an account.");
    }
    return valid;
  },
  saveTosAndAgeVerification: function() {
    var today = this.get("dateHelper").formatDateTime();
    this.get("settings").save("ageVerified", today);
    this.get("settings").save("tosVerified", today);
  },
  actions: {
    signupWithFacebook: function() {
      if (this.verifyAge()) {
        this.send("loginWithFacebook", true);
      }
    },
    loginWithFacebook: function(saveVerification) {
      var that = this;
      this.parseAuth.authenticate_fb(function() {
        that.registerLoginLocationAnalytics("facebook");
        if(saveVerification) {
          that.saveTosAndAgeVerification();
        }
        that.transitionTo("welcome");
      },
      function(user, error) {
        that.status.warn(error.message);
      });

    },
    loginWithLinkedIn: function() {this.status.warn("This hasn't been implemented yet");},
    loginWithTwitter: function() {this.status.warn("This hasn't been implemented yet");},
    loginWithGoogle: function() {this.status.warn("This hasn't been implemented yet");},

    /**
     * Function for age validation
     */



    /** Email function **/
    doEmailLogin: function() {
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
    doEmailSignup: function() {
      if (this.verifyAge()) {
        var user = {
          email: Ember.$("#signup-email").val(),
          password: Ember.$("#signup-password").val()
        };
        if (Ember.$("#signup-password-confirm").val() === user.password) {
          var that = this;
          this.parseAuth.register(user,
            function () {
              //success
              that.get("setupUtils").handleLogin().then(function () {
                that.registerLoginLocationAnalytics("email-signup");
                that.saveTosAndAgeVerification();
                that.transitionTo("welcome");
              });
            },
            function (user, error) {
              that.status.warn(error.message);
            });
        } else {
          this.status.warn("Passwords don't match");
        }
      }
    },
    doEmailReset: function() {
      if (Ember.$("#reset-email").val()) {

        var that = this;
        this.parseAuth.passwordReset(Ember.$("#reset-email").val(), {
          success: function () {
            that.status.success("An email with reset instructions has been sent to '" + Ember.$("#reset-email").val() + "'");
            that.controller.send("showLoginEmail");
          },
          error: function (error) {
            that.status.error(error.message);
          }
        });
      } else {
        this.status.warn("You must supply your email address to reset your password.");
      }
    }
  }
});
