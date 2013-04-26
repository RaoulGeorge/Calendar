define([
  'underscore',
  'backbone'
], function(_, Backbone){

	var BirthdayModel = Backbone.Model.extend({
		
		initialize : function() {
			console.log('Model Constructor called');
		},

		defaults : {
			name : "Reminder"
		},

		

	});

	return BirthdayModel;

});