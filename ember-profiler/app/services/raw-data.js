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
  }
});

export default rawData;