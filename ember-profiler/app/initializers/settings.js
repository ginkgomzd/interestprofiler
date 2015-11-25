import Ember from 'ember';

export function initialize(registry, application) {
  var Settings = Ember.Object.extend({
    profilerDataUtils: Ember.inject.service('profilerDataUtils'),
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
      for(var i in data) {
        if(data.hasOwnProperty(i)) {
          this.set(i, data[i]);
        }
      }
    },
    load: function(name) {
      var localVal, val;
      localVal = this.get(name);
      val = this.get(name);
      if (!val) {
        var setting = this.get("store").getById("setting", name);
        if (setting !== null) {
          val = setting.get("value");
        }
      }

      //Load directly from Parse
      if (!val) {
        if(this.get("parseAuth").user !== null) {
          var settings = this.get("parseAuth").user.get("settings");
          if(settings.hasOwnProperty(name)) {
            val = settings[name];
          }
        }
      }

      if(localVal !== val) {
        this.set(name, val);
      }

      return val;
    },
    save: function(name, value) {
      var setting = this.get("store").getById("setting", name);
      if (setting === null) {
        setting = this.get("store").createRecord("setting", {id: name, 'value': value});
      } else {
        setting.set("value", value);
      }
      setting.save();

      //Save to Parse
      this.get("profilerDataUtils").addItemToParseUserDataObject("settings", name, value);

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

