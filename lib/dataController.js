var PouchDB = require( "pouchdb" );
global.PouchDB = PouchDB;

var users = new PouchDB( "users" );
var currentUser = "41";

var DataController = {};

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
      return listDb( listId ).get( "config" );
    }));
  }).then( function ( configs ) {
    userData.lists = configs;
    return userData;
  }).catch( function( err ) {
    console.error(err);
  });
}

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
    return listId;
  });

}

module.exports = DataController;

