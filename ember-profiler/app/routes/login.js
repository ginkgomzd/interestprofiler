import Ember from 'ember';

export default Ember.Route.extend({
  setupUtils: Ember.inject.service('setup'),
  status: Ember.inject.service('status'),
  settings: Ember.inject.service('settings'),
  parseAuth: Ember.inject.service('parse-auth'),
  dateHelper: Ember.inject.service('date-functions'),
  beforeModel: function() {
    if (this.get("parseAuth").loggedIn) {
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
      this.get("status").loading();
      this.get("parseAuth").authenticate_fb(function() {
        that.registerLoginLocationAnalytics("facebook");
        if(saveVerification) {
          that.saveTosAndAgeVerification();
        }
        that.get("status").loadingComplete();
        that.transitionTo("welcome");
      },
      function(user, error) {
        that.get("status").warn(error.message);
        that.get("status").loadingComplete();
      });

    },
    loginWithLinkedIn: function() {this.get("status").warn("This hasn't been implemented yet");},
    loginWithTwitter: function() {this.get("status").warn("This hasn't been implemented yet");},
    loginWithGoogle: function() {this.get("status").warn("This hasn't been implemented yet");},

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
      this.get("status").loading();
      this.get("parseAuth").authenticate(user,
        function() {
          //success
          that.get("setupUtils").handleLogin().then(function() {
            that.registerLoginLocationAnalytics("email");
            that.get("status").loadingComplete();
            that.transitionTo("welcome");
          });
        },
        function(user, error) {
          that.get("status").warn(error.message);
          that.get("status").loadingComplete();
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
          this.get("status").loading();
          this.get("parseAuth").register(user,
            function () {
              //success
              that.get("setupUtils").handleLogin().then(function () {
                that.registerLoginLocationAnalytics("email-signup");
                that.saveTosAndAgeVerification();
                that.get("status").loadingComplete();
                that.transitionTo("welcome");
              });
            },
            function (user, error) {
              that.get("status").warn(error.message);
              that.get("status").loadingComplete();
            });
        } else {
          this.get("status").warn("Passwords don't match");
        }
      }
    },
    doEmailReset: function() {
      if (Ember.$("#reset-email").val()) {

        var that = this;
        this.get("status").loading();
        this.get("parseAuth").passwordReset(Ember.$("#reset-email").val(), {
          success: function () {
            that.get("status").success("An email with reset instructions has been sent to '" + Ember.$("#reset-email").val() + "'");
            that.controller.send("showLoginEmail");
            that.get("status").loadingComplete();
          },
          error: function (error) {
            that.get("status").error(error.message);
            that.get("status").loadingComplete();
          }
        });
      } else {
        this.get("status").warn("You must supply your email address to reset your password.");
      }
    }
  }
});
