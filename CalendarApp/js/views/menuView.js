/*
	menuView.js
	This is the view to display menu items such as -:
		*Add Alarm Button
		*Add Reminder Button
		*Add Birthday Button
		*Monthly / Weekly view of the calendar

*/

define([
  'jquery',
  'underscore',
  'backbone',
  '../models/calendarModel',
  '../models/menuModel',
  '../models/selectedDayModel',
  '../models/alarmModel',
  '../collections/alarmCollection',
  '../models/reminderModel',
  '../collections/reminderCollection',
  '../models/birthdayModel',
  '../collections/birthdayCollection'
], function($, _, Backbone, calendarModel, menuModel, selectedDayModel,AlarmModel, alarmCollection, ReminderModel, reminderCollection, BirthdayModel, birthdayCollection){

	
	var MenuView =  Backbone.View.extend({
		
		el: $('#menu-div'),

		model: calendarModel,


		initialize: function(){
			this.render();
		},

		render: function(){

				Handlebars.registerHelper('ifViewIsMonthly', function(block) {
				    if (this.calendar_format === 'monthly') {				       
				        return block.fn(this);
				    } else {
				        return block.inverse(this);
				    }
				});

				 params = { calendar_format : calendarModel.get("calendarFormat") };

				 var template = Handlebars.compile( $("#menu-template").html());
		         $(this.el).html( template(params) );
		         return(this);
		},
		events : {

			"click #add-alarm-btn" : "addAlarm",

			"click #add-reminder-btn" : "addReminder",

			"click #add-birthday-btn" : "addBirthday",

			"change input[type=radio]" : "changeCalendarFormat",

			"click #clear-btn" : "clearData",
		},

		//Changes the calendar format to weekly/monthly - In Progress
		changeCalendarFormat : function(e){
			
			//Change the calendar format
			this.model.set("calendarFormat", $(e.target).attr("value"));
		},

		//Once the "Add Alarm" button has been clicked, we hide the menu bar
		addAlarm : function(){
				this.hideView();
		},
			

		addReminder : function(){
			//Right now we are just showing a visual representation of the reminder on the calendar.
				reminderCollection.addToReminderCollection(new ReminderModel({
					selectedDayId : selectedDayModel.get("selectedDayId")
				}));
		},

		addBirthday : function(){
			//Right now we are just showing a visual representation of the birthday on the calendar.
				birthdayCollection.addToBirthdayCollection(new BirthdayModel({
					selectedDayId : selectedDayModel.get("selectedDayId")
				}));
		},

		//Hiding the view and undelegating events to prevent cloning -(Unsure if this is the best approach)
		hideView : function() {
   			 this.undelegateEvents();
    		$(this.el).removeData().unbind(); 
    		$(this.el).hide();
		},

		showView : function() {
			$(this.el).show();
		},

		clearData : function() {
			/*localStorage.clear();
			document.location.reload(true);*/
			alarmCollection.clearCollection();

		}
	});

	var initialize = function(){

		var menuView = new MenuView();
	};



	return {
		initialize: initialize
	};
});