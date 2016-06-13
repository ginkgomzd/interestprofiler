import Ember from 'ember';

var indexService = Ember.Service.extend({
  rawData: Ember.inject.service('raw-data'),
  find: function(modelName, indexMapping, id, store) {
    var rawData = this.get("rawData");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      rawData.fetchIndex(indexMapping.emberDataNamespace, indexMapping.modelName, id).then(function(ids) {
        if(ids.length > 0) {
          store.find(modelName, {in: ids}).then(function (models) {
            resolve(models);
          }, function(error) {
            reject(error);
          });
        } else {
          resolve([]);
        }
      });
    });
  }
});
export default indexService;