import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  model: function(params) {
    var that = this;
    var programsAndColleges = Ember.RSVP.hash({
      "programs": this.store.find('program', {"occupation": params.index}),
      "colleges": this.get("rawData").fetch("H2CColleges", 'college')
    });
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.store.find('occupation', params.index).then(function(occupation) {

        //Now find the other occupation
        that.store.find('occupation', {'top_code': occupation.get("top_code")}).then(function(secondOccupation) {
          if (secondOccupation.get("length") === 1) {

            //Group the occupations
            console.log("Group the Occupations", secondOccupation.get("length"));
            //todo: Group the occupations

            //Group the extra data and resolve
            that.groupProgramsAndColleges(occupation, programsAndColleges).then(function(data) { resolve(data);});
          } else {
            //Group the extra data and resolve
            that.groupProgramsAndColleges(occupation, programsAndColleges).then(function(data) { resolve(data);});
          }
        });
      });
    });
  },
  groupProgramsAndColleges: function(occupation, extras) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      extras.then(function(programsAndColleges) {

        //Group the Programs
        //todo: Group the programs by college

        resolve({occupation: occupation, programs: programsAndColleges.programs, colleges: programsAndColleges.colleges});
      });
    });
  },
  actions: {
    viewCollege: function(collegeID) {
      this.transitionTo("college", collegeID);
    },
    openCollegeLink: function(data, id) {
      this.send("openExternalLink", data[id]['collegeURL']);
    }
  }
});
