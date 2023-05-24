var searchBtn = document.getElementById("start-btn");

var mapDiv = document.querySelector("#tempmapdiv");

var end = localStorage.getItem("Destination");
var saveBtn = document.getElementById("save-btn");
var tripTime;

var map;
var waypoints;

// Function to initialize the map by pulling search terms from local storage.
function initMap() {
  var start = localStorage.getItem("Origin");
  var end = localStorage.getItem("Destination");
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  var mapLayer = document.getElementById("tempmapdiv");
  var centerCoordinates = new google.maps.LatLng(-87.65, 41.85);
  var defaultOptions = {
    mapId: "7acc486bc4b7f6c5",
    center: centerCoordinates,
    zoom: 8,
    icon: image,
  };
  map = new google.maps.Map(mapLayer, defaultOptions);

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  var start = localStorage.getItem("Origin");
  var end = localStorage.getItem("Destination");

  var tripStart = document.getElementById("trip-start"); //displaying start and end point on the page
  var tripEnd = document.getElementById("trip-end");
  var weatherLocation = document.getElementById("weather-location");

  tripStart.textContent = start;
  tripEnd.textContent = end;
  weatherLocation.textContent = end;
  drawPath(directionsService, directionsDisplay, start, end);
}
// Function to draw the route on the map
function drawPath(directionsService, directionsDisplay, start, end) {
  directionsService.route(
    {
      origin: start,
      destination: end,
      optimizeWaypoints: true,
      travelMode: "DRIVING",
    },
    function (response, status) {
      tripTimeEl = document.getElementById("trip-time");
      tripDistEl = document.getElementById("trip-dist");
      tripTime = response.routes[0].legs[0].duration.text;
      tripDist = response.routes[0].legs[0].distance.text;
      tripTimeEl.textContent = tripTime;
      tripDistEl.textContent = tripDist;

      if (status === "OK") {
        directionsDisplay.setDirections(response);
      } else {
        document.getElementById("alert").textContent =
          "Please enter a valid city name";
        console.log("error");
      }
    }
  );
}
