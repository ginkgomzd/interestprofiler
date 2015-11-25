import Ember from 'ember';

export function initialize(registry, application) {
  var Settings = Ember.Object.extend({
    parseAuth: Ember.inject.service('parse-auth'),
    store: Ember.inject.service('store'),
    setup: function() {
      var settings = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
        settings.get("store").findAll("setting").then(function(model) {
          model.forEach(function(item) {
            settings.set(item.get("id"), item.get("value"));
          });
          resolve();
        });
      });
    },
    reloadAllSettings: function(data) {
      var settings = this;
      data.forEach(function(setting) {
        settings.set(setting.id, setting.value);
      });
    },
    load: function(name) {
      var setting = this.get("store").getById("setting", name);
      //Todo: Load from Parse
      if (setting === null) {
        this.set(name, null);
      } else {
        this.set(name, setting.get("value"));
      }
      return this.get(name);
    },
    save: function(name, value) {
      var setting = this.get("store").getById("setting", name);
      if (setting === null) {
        setting = this.get("store").createRecord("setting", {id: name, 'value': value});
      } else {
        setting.set("value", value);
      }
      setting.save();

      //todo: Save to Parse
      //Put

      //This is to trigger observable changes, otherwise they aren't triggered
      this.set(name, null);
      this.set(name, value);
    }
  });

  application.register('service:settings', Settings);
  application.inject('route', 'settings', 'service:settings');
  application.inject('controller', 'settings', 'service:settings');
  application.inject('view', 'settings', 'service:settings');
  application.inject('component', 'settings', 'service:settings');
}
export default {
  name: 'settings',
  initialize: initialize
};

