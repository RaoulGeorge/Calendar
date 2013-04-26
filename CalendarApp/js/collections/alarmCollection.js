define([
  'underscore',
  'backbone',
  'localstorage',
  '../models/alarmModel'
], function(_, Backbone, localstorage, AlarmModel){

	var AlarmCollection = Backbone.Collection.extend({
		
		model: AlarmModel,

		localStorage: new localstorage("abc"),

		addToAlarmCollection: function(model) {
			this.add(model);
		},

		clearCollection: function() {

			this.each(function(model) {
				model.destroy();
			});

			for (var i = this.length - 1; i >= 0; i--) { 
				this.at(i).destroy(); 
			}

		}

	});

	var alarmCollection = new AlarmCollection();

	alarmCollection.on("change", function(){
	})
	
	return alarmCollection;

});