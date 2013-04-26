define([
  'underscore',
  'backbone'
], function(_, Backbone){

	var ReminderModel = Backbone.Model.extend({
		
		initialize : function() {
			
		},

		defaults : {
			name : "Reminder"
		},

		

	});

	return ReminderModel;

});