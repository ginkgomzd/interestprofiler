export default {
  name: 'settings',
  after: 'setup',
  initialize: function(instance) {
    // code
    var Settings = instance.container.lookup("settings:main");
    Settings.setStore(instance.container.lookup("store:main"));
  }
};
