var page = require( "page" );

// this does probably not go here either
var content = document.querySelector( "#content" );

// fake data, wants to be deleted! :D starts at user level
/*var loldata = {
  id: 41,
  name: "Dale",
  location: "Valencia, Spain",
  lists: [{
    id: '12345',
    title: {
      noun: "cats",
      pronoun: "we",
      verb: "petting"
    },
    members: [
      { url: "http://arandomurl.com", thumb: "http://placekitten.com/g/30/50" },
      { url: "http://garann.com", thumb: "http://placekitten.com/g/30/50" }
    ],
    items: [
      { img: "http://placekitten.com/g/70/100" },
      { note: "Razzo", link: "https://instagram.com/p/xrajHTyvkO/?taken-by=garann" },
      { note: "little razzos", latlong: "39.478002,-0.381681" }
    ]
  },
  {
    id: '12346',
    title: {
      noun: "shows",
      pronoun: "I",
      verb: "seeing"
    },
    members: [
      { url: "http://arandomurl.com", thumb: "http://placekitten.com/g/30/50" }
    ],
    items: [
      { img: "https://s-media-cache-ak0.pinimg.com/736x/7c/32/51/7c32516dabe2e41f473137540e685582.jpg" },
      { link: "http://www.songkick.com/concerts/23729108-two-gallants-at-loco-club", date: "16-10-2015" }
    ]
  }]};*/


var data = require( "./dataController" ),
  templates = {
    allLists: require( "./templates/allLists" ),
    list: require( "./templates/list" ),
    addList: require( "./templates/addList" ),
    addItem: require( "./templates/addItem" ),
    profile: require( "./templates/profile" )
  };

function render( tpl, dataPromise ) {
  if ( dataPromise ) {
    dataPromise.then( function( data ) {
      content.innerHTML = templates[ tpl ]( data );
    });
  } else {
    content.innerHTML = templates[ tpl ]( {} );
  }
}

page( "/", function() {
  render( "allLists", data.getLists() );
});

page( "/login" , function() { });
page( "/logout" , function() { });

page( "/profile" , function() {
  // member's own profile
  render( "profile", data.getMember() );
});
page( "/profile/:id" , function( ctx ) {
  render( "profile", data.getMember( ctx.params.id ) );
});

page( "/list/:id", function( ctx ) {
  // content.innerHTML = require( "./templates/list" )( loldata.lists[ ctx.params.id == "12345" ? 0 : 1 ] );
  render( "list", data.getList( ctx.params.id ) );
});

page( "/addList", function() {
  render( "addList", Promise.resolve({ id: '41' }) );
});
page( "/leaveList/:id" , function() { });

page( "/list/:id/item/:id" , function() { });
page( "/list/:id/addItem" , function() { 
  render( "addItem" );
});
page( "/list/:id/deleteItem/:id" , function() { });

page();
