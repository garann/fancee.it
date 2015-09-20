var Fancee = function() {

  this.init = function() {
    var content = document.querySelector( "#content" );
    // test data, needs to come from some datastore someday
    content.innerHTML = require( "./templates/list" )({
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
  };

  return this;

}();

Fancee.init();
