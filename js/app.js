// Create a global map variable
var map;


var ViewModel = function() {
    var self = this; //ensure we don't confuse 'this' contexts
    this.places = ko.observableArray([]); //create array of places to store

    startingPlaces.forEach(function(place){
        self.places().push(new Place(place)); //create all new places and markers
    });
    console.log("created places");
    console.log(self.places());

    this.getPlaces = function() {
        return JSON.parse('{{ myArray | tojson | safe}}');
    };

};

//store the ViewModel object so its parameters can be referenced by other functions
var myModel = new ViewModel();
ko.applyBindings(myModel);

//Create a new marker and store it on the data object
function addMarker(data) {
    data.singleLatLng = makeLatLngString(data.lat, data.lng);
    data.marker = new google.maps.Marker({
      position: data.singleLatLng,
      map: map,
      title: data.name
    });

   data.infowindow = new google.maps.InfoWindow({
      content: data.name
    });

   data.marker.addListener('click', function() {
      data.infowindow.open(map, data.marker);
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
       console.log(myModel);
       console.log(myModel.getPlaces());

       myModel.getPlaces().forEach(addMarker);

   }
};

//Place is the object which holds the information pertaining to one restaurant
function makeLatLngString(lat, lng) {
    // Create a single latLng literal object.
   var singleLatLng = {lat: this.lat, lng: this.lng};
   return singleLatLng
}





