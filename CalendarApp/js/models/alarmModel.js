define([
  'underscore',
  'backbone'
], function(_, Backbone){

	var AlarmModel = Backbone.Model.extend({
		
		initialize : function() {
		},

		defaults : {
			name : "Alarm"
		},

		

	});

	return AlarmModel;

});