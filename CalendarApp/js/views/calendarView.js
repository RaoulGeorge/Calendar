/*
	calendarView.js
		View to display the calendar.
		Collection used to render this view - DateCollection.js
		

*/

define([
  'jquery',
  'handlebars',
  'underscore',
  'backbone',  
  'localstorage',
  'models/calendarModel',
  'models/selectedDayModel',
  'models/dateModel',
  'collections/dateCollection',
  'collections/alarmCollection',
  'collections/reminderCollection',
  'collections/birthdayCollection',

], function($, Handlebars, _, Backbone, localstorage, calendarModel, selectedDayModel, DateModel, dateCollection,  alarmCollection,  reminderCollection,  birthdayCollection ){



	
	var CalendarView = Backbone.View.extend({
	
		render: function() {		

			//Used to concatenate date and month to create a unique id for each day in the calendar
			//For ex-:  id="1-April"
			Handlebars.registerHelper('createId', function(object) {

				var str_split = object.split(',');

			  return new Handlebars.SafeString(
			    "id='" + $.trim(str_split[1]) + "-" + calendarModel.get("selectedMonth") + "'"
			  );
			});

			//Check if the selected day needs to be displayed
			//If the currently rendered date was selected by the user, we add a class="calendar-day-click"
			Handlebars.registerHelper('if', function(conditional, options) {	
				  var str =  (conditional.split(',')[1]).replace(/\s+/g, ''); //Extract the date portion from the id. Converts Sun, 13 to 13.
				  if(str + '-' + calendarModel.get('selectedMonth') === selectedDayModel.get("selectedDayId")) {
				    return options.fn(this);

				  } else {
				    return options.inverse(this);
				  }
				});





			var calendarTemplate,
				params;

			if(calendarModel.get("calendarFormat")==="monthly"){

				   calendarTemplate = Handlebars.compile( $("#calendar-monthly-template").html());
				   params = {
	         					calendar_month: calendarModel.get("selectedMonth"),
	         					calendar_days: this.collection.chain()			//Filter to show only dates in the current month		
													.filter(function(model) {
														return model.get("month") === calendarModel.get("selectedMonthNumber");
													})
													.map(function(num){													
														return num.get("calendarHeader");
													})
													.value(),												
	         					selected_day: selectedDayModel.get("selectedDayId")
	     					};

	     	} else {	//Weekly view

	     			var datesToBeDisplayed = calendarModel.getCurrentWeek(calendarModel.convertIdToDateObject(calendarModel.get("displayedWeekId")));
	     			

	     			calendarTemplate = Handlebars.compile( $("#calendar-weekly-template").html());
	     			 params = {
	         					calendar_week: calendarModel.createUniqueId(datesToBeDisplayed[0]) + ' to ' + calendarModel.createUniqueId(datesToBeDisplayed[6]),
	         					calendar_days: this.collection.chain()			//Filter to show only dates in the current month		
													.filter(function(model) {
														if($.inArray(model.get("uniqueid"), calendarModel.createUniqueId(datesToBeDisplayed)) >= 0 ) {
															return true;
														}
														return false;
													})
													.map(function(num){													
														return num.get("calendarHeader");
													})
													.value(),												
	         					selected_day: selectedDayModel.get("selectedDayId")
	     					};
	     	}
	     	
	        // Load the compiled HTML into the Backbone "el"
	         $(this.el).html( calendarTemplate(params) );
	         
	        

			 this.displayAlarms();

	         //Iterate through reminder collection and reload alarms on each page render
	         reminderCollection.each(function(model){	         	
	         	var reminderTemplate = Handlebars.compile( $("#reminder-template").html());		        
		        $('#' + model.get("selectedDayId")).append( reminderTemplate() );
	         });

	         //Iterate through birthday collection and reload alarms on each page render
	         birthdayCollection.each(function(model){	         	
	         	var birthdayTemplate = Handlebars.compile( $("#birthday-template").html());		        
		        $('#' + model.get("selectedDayId")).append( birthdayTemplate() );
	         });

	         return(this);
		},

		events: {
			"mouseover .calendar-day" : function(item){	

				//Add styling			
				$(item.target).addClass('calendar-day-mouseover');
			},

			"mouseover .calendar-day-weekly" : function(item){	

				//Add styling			
				$(item.target).addClass('calendar-day-mouseover');
			},

			"mouseout .calendar-day" : function(item){				
				$(item.target).removeClass('calendar-day-mouseover');
			},

			"mouseout .calendar-day-weekly" : function(item){				
				$(item.target).removeClass('calendar-day-mouseover');
			},

			"click .calendar-day" : "selectedDay",

			"click .calendar-day-weekly" : "selectedDayInWeeklyView",

			"click .alarm-div" : "displayAlarm",

			"click #prev-btn" : "previousMonth",

			"click #next-btn" : "nextMonth",

			"click #prev-btn-weekly" : "previousWeek",

			"click #next-btn-weekly" : "nextWeek",

			"keydown $(body)" : "keyDownFunction"
		},

		keyDownFunction : function(e) {
			//console.log(e);
		},

		displayAlarms : function() {
			//Iterate through alarm collection and reload alarms on each page render
	         alarmCollection.each(function(model){	         	
	         	//console.log(model.get("affectedDayId"));
	         	var alarmTemplate = Handlebars.compile( $("#alarm-template").html());		
	         	var params = {
					      alarm_cid: model.cid,
					      alarm_name: model.get("name")
				};  
				var affectedDayId_arr = model.get("affectedDayId");
				for(var i=0; i<affectedDayId_arr.length; i++){
					//console.log('#' + selectedDayId_arr[i]);
		        	$('#' + affectedDayId_arr[i]).append( alarmTemplate(params) );
		        }
	         });
		},

		selectedDay :  function(item) {		//gets the jquery wrapper around the element that is selected

			var selectedDayId;
			
			//Remove the styling from the previously selected day						
			$('#' + selectedDayModel.get("selectedDayId")).removeClass("calendar-day-click");
			
			//Refactor needed
			//Check if calendar day is being 
			if($(item.target).hasClass("calendar-day")){					//If the user has clicked the calendar date area
				$(item.target).addClass("calendar-day-click");
				selectedDayId = $(item.target).attr('id');
			} else {														//If the user has the header of the date, we need to pass the parent as an attribute
				$(item.target).parent().addClass("calendar-day-click");
				selectedDayId = $(item.target).parent().attr('id');
			}
			var weekday = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			selectedDayModel.set("selectedDayId", selectedDayId);
			selectedDayModel.set("selectedDay", weekday[calendarModel.convertIdToDateObject(selectedDayId).getDay()]);
			calendarModel.set("displayedWeekId" , selectedDayId);
			
		},

		selectedDayInWeeklyView : function(item) {
			var selectedDayId;
			
			//Remove the styling from the previously selected day						
			$('#' + selectedDayModel.get("selectedDayId")).removeClass("calendar-day-click");
			
			//Refactor needed
			//Check if calendar day is being 
			if($(item.target).hasClass("calendar-day-weekly")){					//If the user has clicked the calendar date area
				$(item.target).addClass("calendar-day-click");
				selectedDayId = $(item.target).attr('id');
			} else {														//If the user has the header of the date, we need to pass the parent as an attribute
				$(item.target).parent().addClass("calendar-day-click");
				selectedDayId = $(item.target).parent().attr('id');
			}
			var weekday = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			selectedDayModel.set("selectedDayId", selectedDayId);
			selectedDayModel.set("selectedDay", weekday[calendarModel.convertIdToDateObject(selectedDayId).getDay()]);
			calendarModel.set("displayedWeekId" , selectedDayId);
		},

		displayAlarm : function(event) {	//Displays the alarm details
			var model = alarmCollection.get($(event.target).attr('data-alarm-cid'));
			var alert_str = 'Time: ' + model.get("time") + '\nRepeat: ' + model.get("repeat") + '\nName: ' + model.get("name");
			alert(alert_str);
			event.stopPropagation();	//Stop the click event from propagating up the event chain
		},

		previousMonth: function(){		//updates the model with the previous month

			calendarModel.setPreviousMonth();
			this.render();
		},

		nextMonth: function() {		//updates the model with the next month
			
			calendarModel.setNextMonth();
			this.render();
		},

		previousWeek: function(){
			calendarModel.setPreviousWeek();
			this.render();
		},

		nextWeek: function(){
			calendarModel.setNextWeek();
			this.render();
		},		

		initialize : function() {
			
			alarmCollection.fetch();	//fetches from localstorage using the adapter
			this.render();	
			var self = this;		

			//Bind left and right arrow keys to navigate to next and previous month/week
			 $('body').bind('keydown', function(e){
			 	if(e.keyCode===37) {	//left arrow
			 		if(calendarModel.get("calendarFormat")==='monthly') {
			 			self.previousMonth();
			 		} else {
			 			self.previousWeek();
			 		}
			 	}

			 	if(e.keyCode===39) {	//right arrow
			 		if(calendarModel.get("calendarFormat")==='monthly') {
			 			self.nextMonth();
			 		} else {
			 			self.nextWeek();
			 		}
			 	}
			 });
			

			//this.model.on('change', this.render, this);			 
			calendarModel.on("change:calendarFormat", function(model){
				self.render();
			});

			alarmCollection.on("remove", function(model){
				if(alarmCollection.length===0) {
					self.render();
				}
			});
		},

		showView : function() {
			$(this.el).show();
		},

		hideView : function() {
			$(this.el).hide();
		}

		
	});

	var initialize = function(){	


		//var dateCollection = new DateCollection();		


		var calendarView = new CalendarView({
			el: $("#calendar-div"),
			collection: dateCollection

		});
		

		
	};

	return {
		initialize: initialize
	};
});