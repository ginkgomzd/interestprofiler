import Ember from 'ember';

export default Ember.Controller.extend({
  modal: Ember.inject.service('modal'),
  settings: Ember.inject.service('settings'),
  showBackButton: "never",
  showAgeVerification: function() {
    if (!this.get("settings").load("ageVerified")) {
      var that = this;
      this.get("modal").confirm("You must be at least 13 years of age to use this app",
        {
          "right": {
            "text": "I am older than 13",
            "action": function () {
              that.get("settings").save("ageVerified", true, true);
            }
          }
        }
      );
    }
  }.on("init")
});