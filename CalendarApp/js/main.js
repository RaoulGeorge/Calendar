require.config({

	paths: {
    jquery: "libs/jquery-1.9.1",
    underscore: "libs/underscore",
    backbone: "libs/backbone",
    localstorage: "libs/backbone.localStorage",
    handlebars: "libs/handlebars"
  },

  shim: {
  	handlebars:{
  		exports:'Handlebars'
  	},
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  },

	urlArgs:  "bust=" + (new Date()).getTime()	//Used for cache busting


  

});

require([
  'app',
], function(App){
  App.initialize();
});