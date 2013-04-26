define([
  'jquery',
  'handlebars',
  'underscore',
  'backbone',
  'localstorage',
  
  'views/calendarView',
  'views/menuView',
  'views/alarmView',
  'views/reminderView',
  'views/birthdayView',
  'router'
], function($, Handlebars, _, Backbone, localstorage,  calendarView, Menu, alarmView, reminderView, birthdayView, router){
  
  var initialize = function(){   
   
    calendarView.initialize();  //View for displaying the calendar
    alarmView.initialize();     //View for displaying each alarm that the user has added 
    reminderView.initialize();  //View for displaying each reminder that the user has added 
    birthdayView.initialize();  //View for displaying each birthday that the user has added 
    router.initialize();
  };

  return {
    initialize: initialize
  };
});