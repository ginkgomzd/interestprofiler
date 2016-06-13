import Ember from 'ember';

export default Ember.Controller.extend({
  status: Ember.inject.service('status'),
  pageTitle: "Results",
  navbarClass: "yellow",
  fetching: function() {return false;}.property(),
  fetchingWatcher:function () {
    if (!this.fetching) {
      this.send("updateWidths");
    }
  }.observes('fetching'),
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
  actions: {
    updateWidths: function() {
      Ember.$(".results .score").each(function() {
        var scoreWidget = Ember.$(this);
        var newScore = scoreWidget.data('score');

        var newWidth = (newScore / 40 * 100) + '%';

        var R = Math.round(202 - (newScore / 40 * 66));
        var G = Math.round(233 - (newScore / 40 * 28));
        var B = Math.round(180 - (newScore / 40 * 94));
        var bgColor = "rgb(" + R + "," + G + "," + B + ")";

        scoreWidget.find(".fill").css({width: newWidth, backgroundColor: bgColor});
      });
    },
    shareResults: function() {
      var that = this;
      this.modal.confirm("Would you like to include the descriptions?", {
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
