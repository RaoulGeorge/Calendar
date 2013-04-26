define([
  'jquery',
  'handlebars',
  'underscore',
  'backbone',
  'views/calendarView', 
  'views/menuView',
  'views/alarmView',
  'views/reminderView',
  'views/birthdayView',
  'views/addAlarmView'
], function($, Handlebars, _, Backbone, Calendar, menuView, alarmView, reminderView, birthdayView, addAlarmView){
  var AppRouter = Backbone.Router.extend({
    routes: {
     
      '': 'mainpage',
      'alarm/new' : 'newAlarm'

    },

    mainpage: function(){
      //Calendar.initialize();
      menuView.initialize();     
      
    }, 

    newAlarm : function(){
      addAlarmView.initialize();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
   
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };

});