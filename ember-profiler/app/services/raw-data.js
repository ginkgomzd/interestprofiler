import Ember from 'ember';

var rawData = Ember.Service.extend({
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
  },
  fetchIndex: function(namespace, model, id) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      localforage.getItem(namespace, function (err, value) {
        if (value && value.hasOwnProperty(model) && value[model].hasOwnProperty("records") && value[model].records.hasOwnProperty(id)) {
          resolve(value[model].records[id]);
        } else {
          resolve([]);
        }
      });
    });
  }
});

export default rawData;