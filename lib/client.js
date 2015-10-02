var Fancee = function() {

  this.routes = require( "./routes" );
  var data = require( "./dataController" );

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
          document.querySelector( "#pronoun" ).value,
          document.querySelector( "#verb" ).value,
          document.querySelector( "#members" ).value
        );
      }
      return false;
    });

  };

  return this;

}();

Fancee.init();
