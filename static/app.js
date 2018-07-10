// Create a global map variable
var map;

//ViewModel for knockout bindings
var ViewModel = function() {
  var self = this;
  self.curRating = ko.observable(1.0); //stores the filter value
  //console.log("curRating set to " + self.curRating());

  //Get the restaurant array from server and make observable
  self.places = ko.observableArray(myPlaces());

  //Create an observable visibility property on each place
  self.places().forEach(function(place) {
      place.visible = ko.observable(true);
  });

  self.highlightMarker = function(place) {
      self.places().forEach(function(place) { //close all other infowindows
        place.infowindow.close();
      });
      place.marker.setAnimation(google.maps.Animation.BOUNCE);
      place.infowindow.open(map, place.marker);
      setTimeout(function() {
        place.marker.setAnimation(null);
      }, 1000);
  }

  setupHamburger();


  //Listener function to update visible items on filter changes
  self.curRating.subscribe(function() {
    //console.log("running filter at rating of " + self.curRating());
    self.places().forEach(function(place) {
      place.infowindow.close();
      if (place.rating < self.curRating()) {
        place.visible(false);
        //Extra if statement in case filter loads before map
        if (typeof place.marker !== "undefined" ) {
          place.marker.setMap(null);
        }
      }
      else {
        place.visible(true);
        if (typeof place.marker !== "undefined" ) {
          place.marker.setMap(map);
        }
      }
    });
  });

};

//store the ViewModel object so its parameters can be referenced by other
//functions
var myModel = new ViewModel();
ko.applyBindings(myModel);

//Create a lat long string for maps
function makeLatLngString(latIn, lngIn) {
   var singleLatLng = {lat: latIn, lng: lngIn};
   return singleLatLng;
}

function setupHamburger() {
  document.getElementById("hamburger").onclick = function() {
    document.getElementById("pane").style.display = "none";
    document.getElementById("mini_pane").style.display = "block";
  };
  document.getElementById("hamburger_mini").onclick = function() {
    document.getElementById("pane").style.display = "block";
    document.getElementById("mini_pane").style.display = "none";
  };
}

//Create a new marker and store it on the data object
function addMarker(data) {
    //console.log('creating marker with lat ' + data.lat);
    data.singleLatLng = makeLatLngString(parseFloat(data.lat),
                                          parseFloat(data.lng));
    data.marker = new google.maps.Marker({
      position: data.singleLatLng,
      map: map,
      title: data.name
    });

    //Create the html content for an infowindow
    var contentString = '<div class="info">' +
    '<h2>' + data.name + '</h2>' +
    '<img class="restImage" src = ' + data.image + '>' +
    '<h3> Yelp Review Avg: ' + data.rating + ' from ' +
    data.review_count + ' reviews</h3>';

   data.infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300
    });

   //On-click of a marker, open the infowindow
   data.marker.addListener('click', function() {
      data.infowindow.open(map, data.marker);
      data.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        data.marker.setAnimation(null);
      }, 1000);
    });
}

//Callback method once Maps API responds
var MapView = {
    init: function() {

     // Function to initialize the map, centered on Littleton
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 39.613321, lng: -105.0166498},
         zoom: 14
       });

       myModel.places().forEach(addMarker); //add all markers

   }
};







