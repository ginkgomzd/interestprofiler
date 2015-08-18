export default {
  name: 'settings',
  after: 'setup',
  initialize: function(instance) {
    // code
    var Settings = instance.container.lookup("service:settings");
    Settings.setStore(instance.container.lookup("store:main"));
  }
};
