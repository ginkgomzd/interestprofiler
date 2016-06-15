import Ember from "ember";

export default Ember.Helper.helper( function(amount) {
  if (amount == 0 || !amount) {
    return "N/A";
  } else {
    //Turns out this doesn't work properly in all instances of mobile safari
    //return "$" + amount.toLocaleString();
    //Convert to string so replace works.
    amount = "$" + amount;
    return amount.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
  }
});