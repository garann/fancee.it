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

    contentEl.on( "click", "#saveItem", function( e ) {
      e.preventDefault();

      var listId = data.currentList;

      data.createItem(
        listId,
        $( "#img" ).val(),
        $( "#note" ).val(),
        $( "#link" ).val(),
        $( "#date" ).val(),
        $( "#latlong" ).val()
      ).then( function( id ) {
        page( "/list/" + listId );
      });

      return false;
    });

  };

  return this;

}();

Fancee.init();
