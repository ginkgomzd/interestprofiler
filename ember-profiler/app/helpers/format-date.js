import Ember from "ember";

export default Ember.Helper.helper( function(input) {
  var format = input[1] || "ddd MMM Do";
  var date = input[0];
  return moment(date).format(format);
});

