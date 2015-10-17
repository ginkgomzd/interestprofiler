import Ember from "ember";

/* This works for 1.13.x
export default Ember.Helper.helper(function(params) {
  if (params[0].hasOwnProperty(params[1]) && params[0][params[1]].hasOwnProperty(params[2])) {
    return params[0][params[1]][params[2]];
  } else {
    return "";
  }
});
*/

export default Ember.Handlebars.makeBoundHelper( function(data, key, field) {
  if (data.hasOwnProperty(key) && data[key].hasOwnProperty(field)) {
    return data[key][field];
  } else {
    return "";
  }
});