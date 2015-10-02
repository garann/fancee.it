// build templates :P >:|
require( "dot" ).process( { path: "./lib/templates" } )

var express = require( "express" ),
  path = require( "path" ),
  app = express();

app.use( express.static( __dirname + "/../public" ) );

function serveWrapper( req, res ) {
  var root = path.resolve( __dirname + "/../public/index.html" );
  res.sendfile( root );
}

app.get( "/", function( req, res ) {
  res.sendfile( __dirname + "/../public/index.html" );
});

app.get( "/profile/:id", serveWrapper );
app.get( "/login", serveWrapper );

app.get( "/logout", serveWrapper );

app.get( "/addList", serveWrapper );
app.get( "/leaveList/:id", serveWrapper );

app.get( "/list/:id", serveWrapper );
app.get( "/list/:id/item/:id", serveWrapper );
app.get( "/list/:id/addItem", serveWrapper );
app.get( "/list/:id/deleteItem/:id", serveWrapper );

app.listen( 3001 );
