<h1>Calendar Application using Backbone.js</h1>
I have recently started learning Backbone.js and I thought it would be fun to create a small application using the new concepts I learnt (MVC Javascript, templating, requirejs).This application emulates a calendar. Users can add events to the calendar such as alarms, reminders, birthdays.
 
<h2>Important source files</h2>
main.js - Require js config paths are in this file<br />
app.js - Main js entrypoint for the applcation<br />
router.js - Handles the logic for routing client side pages<br />
views/calendarView.js - View for displaying the calendar<br />
views/menuView.js - View for displaying the menu<br />
views/addAlarmView.js - View for displaying the "Add alarm" form<br />
models/dateCollection.js - Contains 365 date models in a single collection<br />

<h2>Libs Used</h2>
jQuery<br />
Handlebars<br />
Underscore<br />
Backbone<br />
Require<br />
Localstorage adapter for Backbone - https://github.com/jeromegn/Backbone.localStorage<br />


<h2>Stuff I haven't completed yet</h2>
Reminder and birthday functionality. Right now they are just 2 big buttons.
Trying to figure out a way to incorporate a delete alarms view.
In weekly view I want to add a time refernce. Maybe 24 rows corresponding to 24 hours in a day
Maybe have a daily view as well???
