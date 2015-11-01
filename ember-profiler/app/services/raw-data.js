import Ember from 'ember';

var rawData = Ember.Object.extend({
  fetch: function(namespace, model) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      localforage.getItem(namespace, function (err, value) {
        if (value && value.hasOwnProperty(model)) {
          resolve(value[model].records);
        } else {
          resolve({});
        }
      });
    });
  },
  fetchKeys: function(namespace, model) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      localforage.getItem(namespace, function (err, value) {
        if (value && value.hasOwnProperty(model)) {
          resolve(Object.keys(value[model].records));
        } else {
          resolve([]);
        }
      });
    });
  },
  setValue: function(namespace, model, id, field, value) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      localforage.getItem(namespace, function (err, data) {
        if (data && data.hasOwnProperty(model) && data[model].records.hasOwnProperty(id)) {
          data[model].records[id][field] = value;
          localforage.setItem(namespace, data).then(function() {
            resolve(true);
          });
        } else {
          reject(id);
        }
      });
    });
  }
});

export default rawData;