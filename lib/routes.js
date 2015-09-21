var page = require( "page" );

page( "/", function() {

  var content = document.querySelector( "#content" );

  // test data, needs to come from some datastore someday
  content.innerHTML = require( "./templates/list" )({
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
  });

});

page( "/profile/:id" , function() { });
page( "/login" , function() { });
page( "/logout" , function() { });

page( "/addList" , function() { });
page( "/leaveList/:id" , function() { });

page( "/list/:id" , function() { });
page( "/list/:id/item/:id" , function() { });
page( "/list/:id/addItem" , function() { });
page( "/list/:id/deleteItem/:id" , function() { });

page();
