define([
  'underscore',
  'backbone'
], function(_, Backbone){

	var SelectedDayModel =  Backbone.Model.extend({
		initialize: function() {

		},

		
	});

	var selectedDayModel = new SelectedDayModel({
		selectedDayId: '',
	});

	return selectedDayModel;

});