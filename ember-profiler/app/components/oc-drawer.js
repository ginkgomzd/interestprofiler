import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['oc-drawer'],
  classNameBindings: ['open:oc-drawer-open:oc-drawer-closed'],
  quizPrefix: function() {

    if ((this.settings.answers === undefined || this.settings.answers === null) && this.parseAuth.user !== null) {
      this.settings.save("answers", this.parseAuth.user.get("answers"));
    }

    if (this.settings.answers && this.settings.answers.length === 60) {
      return "Retake ";
    }

    if (this.settings.answers && this.settings.answers.length < 60) {
      return "Resume ";
    }


    return "Take ";
  }.property("settings.answers"),
  open: false,
  tap: function() {
    this.set('open', false);
    return true;
  },
  panLeft: function() {
    this.hideDrawer();
  },
  hideDrawer: function () {
    this.set("open", false);
    return false;
  },
  showDrawer: function () {
    this.set("open", true);
    return false;
  },
  toggleDrawer: function () {
    if (this.get("open")) {
      this.hideDrawer();
    } else {
      this.showDrawer();
    }
  },
  actions: {
    logout: function() {
      this.sendAction("logout");
    }
  },
  regHandler: function() {
    this.set('register-as', this); // register-as is a new property
  }.on('init')
});
