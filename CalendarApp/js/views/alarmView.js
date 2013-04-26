/*
		alarmView.js
		This view is responsible for rendering each alarm that is in the alarmCollection onto the calendar
		Each alarm is represented by a 5x5px div colored in green
*/


define([
  'jquery',
  'handlebars',
  'underscore',
  'backbone',  
  'models/calendarModel',
  'models/selectedDayModel',
  '../models/alarmModel',
  '../collections/alarmCollection'

], function($, Handlebars, _, Backbone,calendarModel, selectedDayModel, AlarmModel, alarmCollection ){
	

	var AlarmView = Backbone.View.extend({

		collection: alarmCollection,
		
		initialize : function () {
			this.render();

			this.collection.on("add", function (model){
				var template = Handlebars.compile( $("#alarm-template").html());	
				var params = {
					alarm_cid: model.cid,
					alarm_name: model.get("name")      
				};
		         console.log('Number of days affected = ' + model.get("affectedDayId").length);
		         for(var index=0; index<model.get("affectedDayId").length; index++){
					$('#' + model.get("affectedDayId")[index]).append( template(params));						         	
		         }

				
			});
		},
		
		
		render : function() {
			return this;

			}

	});

	
	var initialize = function(){
		var alarmView = new AlarmView();
	};



	return {initialize: initialize};

	

});