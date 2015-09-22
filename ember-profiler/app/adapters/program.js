import LFAdapter from 'ember-localforage-adapter/adapters/localforage';

export default LFAdapter.extend({
  namespace: 'H2CPrograms',
  query: function (records, query) {
    console.log("My Query Function! And my bubbles!");
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
