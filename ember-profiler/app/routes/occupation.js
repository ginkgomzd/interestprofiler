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
        var occupationTitle = occupation.get("title");
        //Now find the other occupation
        //We are casting to string because the adaptor does an === and there is a conflict otherwise
        that.store.find('occupation', {topCode: String(occupation.get("topCode"))}).then(function(occupations) {
          if (occupations.get("length") < 2) {
            occupations = [occupation];
          }
          //Group the extra data and resolve
          that.groupProgramsAndColleges(programsAndColleges).then(function(data) {
            var allData = {title: occupationTitle, occupations: occupations, programs: data.programs, colleges: data.colleges};
            resolve(allData);
          });

        });
      });
    });
  },
  groupProgramsAndColleges: function(extras) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      extras.then(function(programsAndColleges) {

        //Group the Programs
        //todo: Group the programs by college

        resolve({programs: programsAndColleges.programs, colleges: programsAndColleges.colleges});
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
