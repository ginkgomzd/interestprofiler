import Ember from 'ember';

export default Ember.Controller.extend({
  showBackButton: "never",
  actions: {

    showLoginOrCreate: function() {
      Ember.$("#allLoginForms>div").slideUp();
      Ember.$("#loginOrCreate").slideDown();
    },

    showSignupActions: function() {
      Ember.$("#allLoginForms>div:not(#signupFooter)").slideUp();
      Ember.$("#signupActions").slideDown();
      Ember.$("#signupFooter").slideDown();
    },

    showSignupEmail: function() {
      Ember.$("#allLoginForms>div:not(#signupFooter)").slideUp();
      Ember.$("#signupEmail").slideDown();
      Ember.$("#signupFooter").slideDown();
    },



    showLoginActions: function() {
      Ember.$("#allLoginForms>div").slideUp();
      Ember.$("#loginActions").slideDown();
    },
    showLoginEmail: function() {
      Ember.$("#allLoginForms>div").slideUp();
      Ember.$("#loginEmail").slideDown();
    },
    showEmailReset: function() {
      if(Ember.$("#login-email").val()) {
        Ember.$("#reset-email").val( Ember.$("#login-email").val() );
      }
      Ember.$("#allLoginForms>div").slideUp();
      Ember.$("#emailReset").slideDown();
    },


    showTerms: function() {
      this.send("openExternalLink", EmberENV.tosURL);
    },
    showPrivacyPolicy: function() {
      this.send("openExternalLink", EmberENV.privacyURL);
    }
  }
});