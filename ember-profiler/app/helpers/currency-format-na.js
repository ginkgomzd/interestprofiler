import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper( function(amount) {
  if (amount == 0 || !amount) {
    return "N/A";
  } else {
    return "$" + amount.toLocaleString();
  }
});