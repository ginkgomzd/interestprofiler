import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showTerms: function() {
      this.send("openExternalLink", EmberENV.tosURL);
    },
    showPrivacyPolicy: function() {
      this.send("openExternalLink", EmberENV.privacyURL);
    }
  }
});