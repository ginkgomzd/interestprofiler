export default {
  name: 'settings',
  initialize: function(instance) {
    // code
    var Settings = instance.container.lookup("settings:main");
    Settings.setStore(instance.container.lookup("store:main"));
  }
};
