define([
  'underscore',
  'backbone',
  '../models/birthdayModel'
], function(_, Backbone, BirthdayModel){

	var BirthdayCollection = Backbone.Collection.extend({
		
		model: BirthdayModel,

		addToBirthdayCollection: function(model) {
			this.add(model);
		}

	});

	var birthdayCollection = new BirthdayCollection();

	birthdayCollection.on("change", function(){
		console.log('COlelction model changed');
	})
	
	return birthdayCollection;

});