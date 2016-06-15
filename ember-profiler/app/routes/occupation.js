import Ember from 'ember';

export default Ember.Route.extend({
  rawData: Ember.inject.service('raw-data'),
  indexService: Ember.inject.service('index'),
  model: function(params) {
    var that = this;
    var programsAndColleges = Ember.RSVP.hash({
      "programs": this.get("indexService").find('program', EmberENV.modelPaths.occupationIndex, params.index, this.store),
      "colleges": this.get("rawData").fetch("H2CColleges", 'college')
    });
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.store.findRecord('occupation', params.index).then(function(occupation) {
        var occupationTitle = occupation.get("title");
        //Now find the other occupation
        //We are casting to string because the adaptor does an === and there is a conflict otherwise
        that.store.query('occupation', {topCode: String(occupation.get("topCode"))}).then(function(occupations) {
          if (occupations.get("length") < 2) {
            occupations = [occupation];
          }
          //Group the Colleges and Programs
          that.groupProgramsAndColleges(programsAndColleges).then(function(data) {
            resolve({title: occupationTitle, occupations: occupations, programs: data});
          });

        });
      });
    });
  },
  groupProgramsAndColleges: function(extras) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      extras.then(function(programsAndColleges) {
        var data = {};
        //Group the Programs with their respective college data
        programsAndColleges.programs.forEach(function(program) {
          var collegeId = program.get("college");
          if(!data.hasOwnProperty(collegeId)) {
            data[collegeId] = {college: programsAndColleges.colleges[collegeId], programs: []};
          }
          data[collegeId].programs.push(program);
        });

        //Flatten to an array so ember doesn't throw a fit about looping
        data = Object.keys(data).map(function (key) {return data[key];});
        resolve(data);
      });
    });
  },
  actions: {
    viewCollege: function(collegeID) {
      this.transitionTo("college", collegeID);
    }
  }
});
