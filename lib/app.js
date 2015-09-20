var express = require( "express" ),
  app = express(),
  // build templates
  require( "dot" ).process( { path: "./templates" } );

app.use( express.static( __dirname + "/../public" ) );

app.get( "/", function( req, res ) {
  res.sendfile( __dirname + "/../public/index.html" );

});

app.listen( 3001 );
