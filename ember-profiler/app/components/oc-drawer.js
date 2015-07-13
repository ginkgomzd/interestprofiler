import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['oc-drawer'],
    classNameBindings: ['open:oc-drawer-open:oc-drawer-closed'],
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
    regHandler: function() {
        this.set('register-as', this); // register-as is a new property
    }.on('init')
});
