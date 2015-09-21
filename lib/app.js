// build templates :P >:|
require( "dot" ).process( { path: "./lib/templates" } )

var express = require( "express" ),
  path = require( "path" ),
  app = express();

app.use( express.static( __dirname + "/../public" ) );

function index( req, res ) {
  var root = path.resolve( __dirname + "/../public/index.html" );
  res.sendfile( root );
}

app.get( "/", function( req, res ) {
  res.sendfile( __dirname + "/../public/index.html" );
});

app.get( "/profile/:id" , index);
app.get( "/login" , index);

app.get( "/logout" , function() { });

app.get( "/addList" , function() { });
app.get( "/leaveList/:id" , index);

app.get( "/list/:id" , index);
app.get( "/list/:id/item/:id" , index);
app.get( "/list/:id/addItem" , index);
app.get( "/list/:id/deleteItem/:id" , index);

app.listen( 3001 );
