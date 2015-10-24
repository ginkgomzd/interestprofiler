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
  }
});

export default rawData;