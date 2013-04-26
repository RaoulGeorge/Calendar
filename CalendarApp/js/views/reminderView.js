/*
		reminderView.js
		This view is responsible for rendering each reminder that is in the reminderCollection onto the calendar
		Each alarm is represented by a 5x5px div colored in yellow
*/

define([
  'jquery',
  'handlebars',
  'underscore',
  'backbone',  
  'models/calendarModel',
  'models/selectedDayModel',
  '../models/reminderModel',
  '../collections/reminderCollection'

], function($, Handlebars, _, Backbone,calendarModel, selectedDayModel, ReminderModel, reminderCollection ){
	

	var ReminderView = Backbone.View.extend({

		collection: reminderCollection,
		
		initialize : function () {
			this.render();
			var that = this;

			this.collection.on("add", function (model){

				var template = Handlebars.compile( $("#reminder-template").html());
		        
		         $('#' + model.get("selectedDayId")).append( template() );
				
			});
		},
		

		
		render : function() {

			return this;

			}

	});

	
	var initialize = function(){
		var reminderView = new ReminderView();
	};

	return {initialize: initialize};

	

});