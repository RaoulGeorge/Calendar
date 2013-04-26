/*
	menuModel.js
	Dummy model when I started out. Not sure if needed.

*/


define([
  'underscore',
  'backbone'
], function(_, Backbone){

	var MenuModel = new Backbone.Model({
		addAlarm : 'disabled',
		addReminder : 'disabled',
		addBirthday : 'disabled'
	});

	return MenuModel;
});