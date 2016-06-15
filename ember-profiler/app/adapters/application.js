import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default LFAdapter.extend({
  namespace: 'H2CMain',
  _query: function (records, query, singleMatch) {
    var results = [], objId;
    if(typeof(query) === "object" && query.hasOwnProperty("in")) {
      
      for(objId in query.in) {
        if(query.in.hasOwnProperty(objId) && records.hasOwnProperty(query.in[objId])) {
          results.push(records[query.in[objId]]);
        }
      }

      return results;
    } else {
      return this._super(records, query, singleMatch);
    }
  },

  /*
  persistData: function(type, data) {
    var modelNamespace = this.modelNamespace(type);
    this.setNamespace(modelNamespace);
    return this._super(type, data);
  },
  _namespaceForType: function (type) {
    var modelNamespace = this.modelNamespace(type);
    this.setNamespace(modelNamespace);
    return this._super(type);
  },
  setNamespace: function(type) {
    var namespace = (EmberENV.modelPaths.hasOwnProperty(type)) ? EmberENV.modelPaths[type].emberDataNamespace : "H2C" + type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    this.set("namespace", namespace);
  },*/
  flushCache: function(namespace) {
    this.cache.data.set(namespace, null);
  }
});
