import Ember from 'ember';

export default Ember.Controller.extend({
  status: Ember.inject.service('status'),
  settings: Ember.inject.service('settings'),
  parseAuth: Ember.inject.service('parseAuth'),
  modal: Ember.inject.service('modal'),
  pageTitle: "Results",
  navbarClass: "yellow",
  fetching: function() {return false;}.property(),
  takeScreenshotAndShare: function() {
    if (window.plugins && window.plugins.socialsharing) {
      html2canvas(Ember.$("#results")[0], {
        onrendered: function (canvas) {
          window.plugins.socialsharing.share(
            'Checkout My Results', //message
            'Here to Career', //title
            canvas.toDataURL(), //image
            null); //link
        }
      });
    } else {
      this.get("status").warn("There was an error loading the sharing dialog");
    }
  },
  shareWithoutDescriptions: function () {
    var that = this;
    //Hide the descriptions
    Ember.$("#results .desc").slideUp(300).promise().done(function() {
      that.takeScreenshotAndShare();
    });
  },
  shareWithDescriptions: function () {
    var that = this;
    //show all of the descriptions
    Ember.$("#results .desc").slideDown(300).promise().done(function() {
      that.takeScreenshotAndShare();
    });
  },
  askToLogin: function() {
    if(!this.get("parseAuth").loggedIn) {
      var that = this;
      Ember.run.scheduleOnce('afterRender', this, function () {
        that.get("modal").confirm("Would you like log in to save your results?", {
          "left": {"text": "No"},
          "right": {"text": "Yes", "action": function() {
            that.get("settings").save("loginDestination", "results", true);
            that.transitionToRoute('login');
          }}
        });
      });
    }
  }.on("init"),
  actions: {
    shareResults: function() {
      var that = this;
      this.get("modal").confirm("Would you like to include the descriptions?", {
        left: {
          text: "No",
          action: function() {that.shareWithoutDescriptions();}
        },
        right: {
          text: "Yes",
          action: function() {that.shareWithDescriptions();}
        }});
    },
    exploreAlumni: function() {
      this.transitionToRoute("alumni", 0);
    }
  }
});
