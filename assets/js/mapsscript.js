//var origin=document.getElementById('start-point').value;
//var destination=document.getElementById('destination').value;
var searchBtn = document.getElementById("start-btn");
var googleApi = "AIzaSyDOMF9Qvb_zajNGVx1sVSlEEZwEnANziH0";
//var mapDiv=document.createElement('div')
// Maps API key
// AIzaSyDOMF9Qvb_zajNGVx1sVSlEEZwEnANziH0

// https://www.google.com/maps/search/?api=1&parameters

// Directions

var mapDiv = document.querySelector("#tempmapdiv");
var googleDirections =
  "https://www.google.com/maps/dir/?api=1&origin={start}&destination={end}&travelmode=driving&map_action=map";

//var DirectionsService;
// origin - defines the starting point from which to display directions
//destination - endpoint of the directions

// function displayMap () {
//     var googleDirections =  'https:google.com/maps/dir/?api=1&origin=Chicago&destination=Milwaukee&travelmode=driving&map_action=map'

//     const {DirectionsService} = await google.maps.importLibrary("routes")
// Initialize and add the map
/*
var map;
async function initMap() {
  var start=document.getElementById('start-point').value;
  var end=document.getElementById('destination').value;
  // The location of Uluru
  const position = { lat: 41.882, lng: -87.623 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
 


  // The map, centered at Uluru
  map = new Map(document.getElementById("tempmapdiv"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
    //calculateAndDisplayRoute
  });

 calculateAndDisplayRoute()
}*/

//initMap();
/*
function calculateAndDisplayRoute(directionsService){
  var direction =new google.maps.DirectionsService()
  console.log(direction);
  var start=document.getElementById('start-point').value;
  var end=document.getElementById('destination').value;
  console.log(start, end);
  var request={
    origin: start,
    destination: end,
    travelMode: 'DRIVING',
  };
  console.log(request);
  var direction =new google.maps.DirectionsService()
  console.log(direction);
  directionsService.route(request,function(response,status) {
        
    if (status==google.maps.DirectionsStatus.OK) {
      var direction =new google.maps.DirectionsService()
      directionsDisplay.setDirections(response);
      console.log(direction);
    }
  });
};
 
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  var start=document.getElementById('start-point').value;
  var end=document.getElementById('destination').value;
  console.log(start, end);
  var request={
    origin: start,
    destination: end,
    travelMode: 'DRIVING',
  };
  directionsService
    .route(request)
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;
searchBtn.addEventListener('click', initMap); */
var tripStart=document.getElementById('trip-start');
var tripEnd=document.getElementById('trip-end');
var end = localStorage.getItem("Destination")

var map;
var waypoints;
function initMap() {
  var mapLayer = document.getElementById("tempmapdiv");
  var centerCoordinates = new google.maps.LatLng(41.882, -87.623);
  var defaultOptions = { center: centerCoordinates, zoom: 8 };
  map = new google.maps.Map(mapLayer, defaultOptions);

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  var start = localStorage.getItem("Origin");

  var end = localStorage.getItem("Destination");
  tripStart.textContent=start;
  tripEnd.textContent=end;
  drawPath(directionsService, directionsDisplay, start, end);
}

function drawPath(directionsService, directionsDisplay, start, end) {
  directionsService.route(
    {
      origin: start,
      destination: end,
      optimizeWaypoints: true,
      travelMode: "DRIVING",
    },
    function (response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      } else {
        window.alert("Problem in showing direction due to " + status);
      }
    }
  );
}


