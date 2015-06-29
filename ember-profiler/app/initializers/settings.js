import Ember from 'ember';

export function initialize(registry, application) {
  var Settings = Ember.Object.extend({
    store: null,
    //This watches for our initial load of all settings and adds them to the object
    //so they can be observedand bound by controllers, routes, views and components
    watchModel: function() {
      this.model.forEach(function(item) {
        this.set(item.id, item.value);
      });
    }.observes("model"),
    //Because of the way initializers work, we can't get an instance of the store
    //until the instance-initializers run, and the settings file there, passes
    //an instance of the store here, and we place it on the object so that
    //it is accessible from our load and save functions.
    setStore: function(store) {
      this.store = store;
      this.set('model', store.find("setting"));
    },
    load: function(name) {
      var setting = this.store.getById("setting", name);
      if (setting === null) {
        this.set(name, null);
        return null;
      } else {
        this.set(name, setting.get("value"));
        return setting.get("value");
      }
    },
    save: function(name, value) {
      var setting = this.store.getById("setting", name);
      if (setting === null) {
        setting = this.store.createRecord("setting", {id: name, 'value': value});
      } else {
        setting.set("value", value);
      }
      setting.save();
      this.set(name, value);
    }
  });

  application.register('settings:main', Settings);
  application.inject('route', 'settings', 'settings:main');
  application.inject('controller', 'settings', 'settings:main');
  application.inject('view', 'settings', 'settings:main');
  application.inject('component', 'settings', 'settings:main');
}
export default {
  name: 'settings',
  initialize: initialize
};

