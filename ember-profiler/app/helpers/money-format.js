import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper( function(amount) {
  return "$" + amount.toLocaleString();
});