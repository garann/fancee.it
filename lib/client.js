var Fancee = function() {

  // this is just here so it gets called, reexamine later
  this.routes = require( "./routes" );
  var data = require( "./dataController" ),
    page = require( "page" );

  this.init = function() {

    var contentEl = document.querySelector( "#content" );
    
    // add a list
    contentEl.addEventListener( "click", function ( e ) {
      e.preventDefault();
      e.stopPropagation();
      var id = e.target.id;

      if ( id == "saveList" ) {

        data.createList(
          document.querySelector( "#noun" ).value,
          document.querySelector( "#verb" ).value,
          document.querySelector( "#members" ).value
        ).then( id ) {
          page( "/list/" + id );
        };

      }
      return false;
    });

  };

  return this;

}();

Fancee.init();
