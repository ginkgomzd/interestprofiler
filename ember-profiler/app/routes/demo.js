import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return [
      {img: "Slide1.png", text1: "Welcome to Here to Career!", text2: "Thanks, let's go!"},
      {img: "Slide2.png", text1: "Check Wages &amp; Salaries<br />for local careers.", text2: ""},
      {img: "Slide3.png", text1: "Take the Jobs &amp;Careers<br />quiz to find out which<br />career is right for you.", text2: ""},
      {img: "Slide4.png", text1: "Match with<br />California Community<br />College Alumni.", text2: ""},
      {img: "Slide5.png", text1: "Search for nearby<br />Degrees &amp; Colleges.", text2: ""}
    ];
  },
  actions: {
    navigateAway: function() {
      if(this.parseAuth.loggedIn) {
        this.transitionTo("welcome");
      } else {
        this.transitionTo("login");
      }
    }
  }
});
