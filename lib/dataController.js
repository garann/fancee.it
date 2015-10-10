var PouchDB = require( "pouchdb" );
global.PouchDB = PouchDB;

var users = new PouchDB( "users" );
// we probably want this to be public
var currentUser = "41";

var DataController = {};
DataController.currentList;

var listDbs = {};
function listDb(name) {
  var dbName = "list_" + name;
  if (dbName in listDbs) {
    return listDbs[dbName];
  }
  return new PouchDB(dbName);
}

DataController.getLists = function() {
  var userData;
  return users.get( currentUser ).then( function ( userDoc ) {
    userData = userDoc;
    var lists = userDoc.lists || [];
    return Promise.all( lists.map( function ( listId ) {
      return listDb( listId ).get( "config" ).catch( function( err ) {
        if ( err.status == 404 ) {
          return undefined;
        }
      });
    }));
  }).then( function ( configs ) {
    var c = [];
    configs.forEach( function( list ) {
      if ( list ) {
        list.id = list.listId;
        c.push( list );
      }
    });
    userData.lists = c;
    return userData;
  }).catch( function( err ) {
    console.error(err);
  });
}

DataController.getList = function( listId ) {
  var output = {},
    list = listDb( listId );

  return list.get( "config" ).then( function( config ) {
    output.id = config.listId;
    output.title = config.title;
    // this is hardcoded test data until we have a members db
    output.members = [
      { url: "/profile/41", thumb: "http://placekitten.com/g/30/50" },
      { url: "/profile/42", thumb: "http://placekitten.com/g/30/50" }
    ];
    output.items = [];
    return list.allDocs({ endkey: "config", inclusive_end: false, include_docs: true });
  }).then( function( listItems ) {
    listItems.rows.forEach( function( row ) {
      output.items.push( row.doc );
    });
    DataController.currentList = listId;
    return output;
  }).catch( function( err ) {
    console.error( err );
  });
};

DataController.getMember = function( memberId ) {
  // if called without an ID, use current user
  memberId = memberId || currentUser;

  return users.get( memberId ).catch( function( err ) {
    if ( err.status == 404 ) {
      // TODO: decide whether to show an error or keep being cute
      return {
        name: "Nobody",
        thumb: "//placebeyonce.com/50-50",
        location: "nowhere"
      }
    }
  });
};

DataController.createList = function(noun, verb, members) {

  var listId = Date.now() + "" + currentUser;
  var listConfig = {
    _id: "config",
    listId: listId,
    title: {
      noun: noun,
      pronoun: members.length ? "we" : "I",
      verb: verb
    },
    members: []
  };

  return users.get( currentUser ).then(function( userDoc ) {
    userDoc.lists = userDoc.lists || [];
    userDoc.lists.push( listId );
    return users.put( userDoc );
  }).then(function() {
    return listDb( listId ).put( listConfig );
  }).then(function() {
    DataController.currentList = listId;
    return listId;
  });

}

DataController.createItem = function( listId, img, note, link, date, latlong ) {

  // need a better way to generate better IDs
  var itemId = Date.now() + "" + currentUser,
    item = {
      _id: itemId,
      img: img,
      note: note,
      link: link,
      date: date,
      latlong: latlong
    },
    list = listDb( listId );

    return list.put( item ).then( function() {
      return itemId;
    });

};

module.exports = DataController;

