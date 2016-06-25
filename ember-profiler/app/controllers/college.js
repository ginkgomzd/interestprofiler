import Ember from 'ember';

export default Ember.Controller.extend({
  status: Ember.inject.service('status'),
  showBackButton: "ios",
  pageTitle: "Degrees and Colleges",
  actions: {
    addToCalendar: function(date) {

      if(window.plugins && window.plugins.calendar) {
        var dateObj = new Date(date.date.value);
        var calOptions = window.plugins.calendar.getCalendarOptions();
        var that = this;
        //The params order:
        //title,eventLocation,notes,startDate,endDate,calOptions,success,error
        window.plugins.calendar.createEventInteractivelyWithOptions(
          date.title,
          null,
          date.description,
          dateObj,
          dateObj,
          calOptions,
          function(msg) { //Success
            that.get("status").success("Event added successfully");
          },
          function(msg) { //Error
            that.get("status").warn("Failed to add this event to your calendar");
          });

      } else {
        console.log("Cannot add the Date");
      }
    }
  }
});