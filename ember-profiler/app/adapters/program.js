import appAdapter from './application';

export default appAdapter.extend({
  namespace: EmberENV.modelPaths.program.emberDataNamespace,
  query: function (records, query) {
    if(typeof(query) === "object" && query.hasOwnProperty("occupation")) {
      var results = [],
        id, record, property, test, push;
      for (id in records) {

        record = records[id];
        push = false;
        if(records[id].hasOwnProperty("occupation")) {
            push = records[id].occupation.indexOf(query.occupation) !== -1;
        }

        if (push) {
          results.push(record);
        }

      }
      return results;
    } else {
      return this._super(records, query);
    }
  }
});
