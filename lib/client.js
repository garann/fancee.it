var Fancee = function() {

  // this is just here so it gets called, reexamine later
  this.routes = require( "./routes" );
  var $ = require( "jquery-browserify" ),
    data = require( "./dataController" ),
    page = require( "page" );

  this.init = function() {

    var contentEl = $( "#content" );
    
    // add a list

    contentEl.on( "click", "#saveList", function ( e ) {
      e.preventDefault();
      
      data.createList(
        $( "#noun" ).val(),
        $( "#verb" ).val(),
        $( "#members" ).val()
      ).then( function( id ) {
        page( "/list/" + id );
      });

      return false;
    });

  };

  return this;

}();

Fancee.init();
