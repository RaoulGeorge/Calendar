/*
		dateCollection.js
		This collection holds 365 DateModels
*/

define([
  'underscore',
  'backbone',
  '../models/dateModel'
], function(_, Backbone, dateModel){

	var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var weekday = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	var DateCollection = Backbone.Collection.extend({
		
		model: dateModel,


		initialize: function(){

			//Get current month
			var d = new Date();
			
			var currentMonth = month[d.getMonth()];

			//Refactor if possible
			//Creates 365 date models to populate the calendar
			for(var i=0; i<12; i++){
				if(i===0 || i===2 || i===4 || i===6 || i===7 || i===9 || i===11){
					for(var j=1; j<32; j++){
						this.addToCollection(i, j);
					}
				} else if(i===1) {
					for(var j=1; j<29; j++){
						this.addToCollection(i, j);
					}
				} else {
					for(var j=1; j<31; j++) {
						this.addToCollection(i, j);
					}
				}
			}

		},

		addToCollection: function(i, j) {

			var d = new Date(2013, i, j);
			

			this.add(new DateModel({
							date: j,
							month: i,
							day: weekday[d.getDay()],
							calendarHeader: weekday[d.getDay()] + ', ' + j,
							dateObj: d,
							isSelected: false,
							calendarFormat: 'daily',
							uniqueid: j + '-' + month[i]
						}));
		}


	});	

	var dateCollection = new DateCollection();
	return dateCollection;

});