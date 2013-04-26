/*
		birthdayView.js
		This view is responsible for rendering each birthday that is in the alarmCollection onto the calendar
		Each alarm is represented by a 5x5px div colored in red
*/

define([
  'jquery',
  'handlebars',
  'underscore',
  'backbone',  
  'models/calendarModel',
  'models/selectedDayModel',
  '../models/birthdayModel',
  '../collections/birthdayCollection'

], function($, Handlebars, _, Backbone,calendarModel, selectedDayModel, BirthdayModel, birthdayCollection ){
	

	var BirthdayView = Backbone.View.extend({

		collection: birthdayCollection,
		
		initialize : function () {
			this.render();
			var that = this;

			this.collection.on("add", function (model){

				var template = Handlebars.compile( $("#birthday-template").html());
		        
		         $('#' + model.get("selectedDayId")).append( template() );
				
			});
		},
		

		
		render : function() {

			return this;

			}

	});

	
	var initialize = function(){
		var birthdayView = new BirthdayView();
	};

	return {initialize: initialize};

	

});