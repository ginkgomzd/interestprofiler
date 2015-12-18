import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default LFAdapter.extend({
  namespace: EmberENV.modelPaths.alumni.emberDataNamespace,
  query: function (records, query) {
    var results = [], objId;
    if(typeof(query) === "object" && query.hasOwnProperty("in")) {

      for(objId in query.in) {
        if(query.in.hasOwnProperty(objId) && records.hasOwnProperty(query.in[objId])) {
          results.push(records[query.in[objId]]);
        }
      }

      return results;
    } else {
      return this._super(records, query);
    }
  }
});