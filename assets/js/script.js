var origin=document.getElementById('start-point').value;
var destination=document.getElementById('destination').value;
var searchBtn=document.getElementById('start-btn')
//var mapDiv=document.createElement('div')
// Maps API key
// AIzaSyDOMF9Qvb_zajNGVx1sVSlEEZwEnANziH0

// https://www.google.com/maps/search/?api=1&parameters

// Directions

var mapDiv = document.querySelector("#tempmapdiv")
var googleDirections =  'https://www.google.com/maps/dir/?api=1&origin={origin}&destination={destination}&travelmode=driving&map_action=map'

	
// DirectionsService()
// origin - defines the starting point from which to display directions 
//destination - endpoint of the directions 

// function displayMap () {
//     var googleDirections =  'https:google.com/maps/dir/?api=1&origin=Chicago&destination=Milwaukee&travelmode=driving&map_action=map'

//     const {DirectionsService} = await google.maps.importLibrary("routes")
// Initialize and add the map
let map;

async function initMap() {
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
    
  });
}

initMap();
/*
var direction = new google.maps.DirectionsService()
directionsService.route(directionsService.route()
{
    origin: "Chicago"
    destination: "New York"
    travelMode: "DRIVING"
},
(response, status) => {
    console.log(response)
    console.log(status)
}
);*/







    
    
