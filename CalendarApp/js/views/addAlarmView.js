define([
  'jquery',
  'handlebars',
  'underscore',
  'backbone',
  'localstorage',
  'models/selectedDayModel',
  'models/alarmModel',
  'collections/alarmCollection',
  'collections/dateCollection',
  'models/calendarModel'
], function($, Handlebars, _, Backbone, localstorage, selectedDayModel, AlarmModel, alarmCollection, dateCollection, calendarModel){
	
	var AddAlarmView = Backbone.View.extend({

		el: $('#add-alarm-div'),
		
		initialize : function () {
			console.log(AddAlarmView.el);
			this.render();			
		},

		events: {

			"click #add-alarm-submit-btn": "addAlarm"

		},
		
		addAlarm: function() {

				//var dateCollection = new DateCollection();
				

				/*alarmCollection.add(new AlarmModel({
					"selectedDayId1" : selectedDayModel.get("selectedDayId")
				}));*/

				var time_input = $('#time-input').val(),
					repeat_input = $('#repeat-list').val(),
					name_input = $('#name-input').val(),
					affectedDayId_input = [];
					
					if(repeat_input==='1') {
						affectedDayId_input.push(selectedDayModel.get("selectedDayId"));
					} else if(repeat_input==='2') {
						affectedDayId_input = dateCollection.map(function(model){													
												return model.get("uniqueid")  ;
											});
						
					}  else if(repeat_input==='3') {
						affectedDayId_input = dateCollection.chain().filter(function(model) {
												return selectedDayModel.get("selectedDay") === model.get("day");
											}).map(function(model){												
												return model.get("uniqueid")  ;
											}).value();
					}

					


					

	/*alarmCollection.add(new AlarmModel({
					time: time_input,
					repeat: repeat_input,
					name: name_input,
					selectedDayId : selectedDayId_input
				}));*/

				var newAlarmModel = new AlarmModel({'time':time_input, 'repeat':repeat_input, 'name':name_input, 'affectedDayId':affectedDayId_input});

				alarmCollection.create(newAlarmModel,{
									success: function() {
										//console.log('successfully saved');
									},
									error: function() {
										console.log('error');
									}
								});

				console.log(alarmCollection);
				$('#menu-div').show();
				$(this.el).off('click', '#add-alarm-submit-btn');
				$(this.el).empty();
				/*Router.history.navigate("");*/
			},
		
		render : function() {
			 var addAlarmTemplate = Handlebars.compile( $("#add-alarm-template").html());
			  $(this.el).html( addAlarmTemplate({
			  	
			  }));

			  return this;
			},

			hideView : function() {
				$(this.el).hide();
			}


	});

	
	var initialize = function() {

		var addAlarmView = new AddAlarmView();
	};

	return {
		initialize: initialize
	};

});