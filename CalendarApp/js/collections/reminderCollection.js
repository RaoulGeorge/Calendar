define([
  'underscore',
  'backbone',
  '../models/reminderModel'
], function(_, Backbone, ReminderModel){

	var ReminderCollection = Backbone.Collection.extend({
		
		model: ReminderModel,

		addToReminderCollection: function(model) {
			this.add(model);
		}

	});

	var reminderCollection = new ReminderCollection();

	reminderCollection.on("change", function(){
		console.log('COlelction model changed');
	})
	
	return reminderCollection;

});