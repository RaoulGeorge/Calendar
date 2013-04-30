define([
  'underscore',
  'backbone',
  'localstorage'
], function(_, Backbone, localstorage){

	var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var CalendarModel = Backbone.Model.extend({
		initialize: function(){

			var d = new Date();

			
			var currentMonth = month[d.getMonth()];
			this.set("selectedMonth", currentMonth);
			this.set("selectedMonthNumber", d.getMonth());
			this.set("displayedWeekId", this.createUniqueId(d));

		}, 

		//Goes to the previous month and updates the model
		setPreviousMonth: function() {	
			var selectedMonth = month[(_.indexOf(month, this.get("selectedMonth"))  === 0 )? 11 : _.indexOf(month, this.get("selectedMonth")) -1];
			this.set("selectedMonth", selectedMonth);
			this.set("selectedMonthNumber", (_.indexOf(month, this.get("selectedMonth"))  === 0 )? 11 : _.indexOf(month, this.get("selectedMonth")) );
		},

		//Goes to the next month and updates the model
		setNextMonth: function() {
			var selectedMonth = month[(_.indexOf(month, this.get("selectedMonth"))  === 11 )? 0 : _.indexOf(month, this.get("selectedMonth")) + 1];
			this.set("selectedMonth", selectedMonth);
			this.set("selectedMonthNumber", (_.indexOf(month, this.get("selectedMonth"))  === 11 )? 0 : _.indexOf(month, this.get("selectedMonth")) );
		},

		//Goes to the previous week and updates the model
		setPreviousWeek: function() {	

			var dateAfterSubtract = new Date(this.convertIdToDateObject(this.get("displayedWeekId")));
			dateAfterSubtract.setDate(this.convertIdToDateObject(this.get("displayedWeekId")).getDate() - 7);
			this.set("displayedWeekId",this.createUniqueId(dateAfterSubtract));
		},

		//Goes to the next week and updates the model
		setNextWeek: function() {	

			var dateAfterSubtract = new Date(this.convertIdToDateObject(this.get("displayedWeekId")));
			dateAfterSubtract.setDate(this.convertIdToDateObject(this.get("displayedWeekId")).getDate() + 7);
			this.set("displayedWeekId",this.createUniqueId(dateAfterSubtract));
		},

		//Returns the entire week as an array 
		getCurrentWeek: function(currentDate) {
			
			/*var date_str = [(month.indexOf(currentDate.split('-')[1])+1),((currentDate.split('-')[0])),'2013'].join('/');
			//console.log('date_str = ' + date_str);

	     	var weekly_date = new Date(date_str);	*/     
	     	var datesToBeDisplayed = [];

	     	 for (var i = 0; i < 7; i++)
			 {
			    datesToBeDisplayed[i] = new Date(currentDate.getFullYear(),
						                           currentDate.getMonth(),
						                           currentDate.getDate() - currentDate.getDay()  + i);
			 }

			return datesToBeDisplayed;



	     	//console.log('month is ' + weekly_date.getMonth() + ' date is ' + weekly_date.getDate() + ' year is ' + weekly_date.getFullYear());
	     	
		},

		//Creates a unique id after passing in a date array or a single date object
		createUniqueId	: function(dateArr){
			if (dateArr instanceof Array) {	//If an array is passed, then we iterate thru the array and return an array
				var uniqueIdArray = [];
				for(var i=0; i<dateArr.length; i++) {
					uniqueIdArray.push(dateArr[i].getDate() + '-' + month[dateArr[i].getMonth()]);
				}
				return uniqueIdArray;
			} else {						//If a single date object is passed then we return a single unique id
				return dateArr.getDate() + '-' + month[dateArr.getMonth()];
			}
		},

		//Utility function to convert a date id to a date obj
		//For ex -: this will convert 1-April to a javascript date object
		convertIdToDateObject : function(dateId) {
			var date_str = [(month.indexOf(dateId.split('-')[1])+1),((dateId.split('-')[0])),'2013'].join('/');
	     	return (new Date(date_str));	 
		}
					
	});


	var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var calendarModel = new CalendarModel({
		calendarFormat: "monthly"
	});

	 
  return calendarModel;
});