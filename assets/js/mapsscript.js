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
//var tripStart=document.getElementById('trip-start'); //displaying start and end point on the page
//var tripEnd=document.getElementById('trip-end');
var end = localStorage.getItem("Destination")
var saveBtn=document.getElementById('save-btn')
//var savedTrip=[]
var map;
var waypoints;
function initMap() {
  var start = localStorage.getItem("Origin");

  var end = localStorage.getItem("Destination");
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  var mapLayer = document.getElementById("tempmapdiv");
  var centerCoordinates = new google.maps.LatLng(-87.65, 41.85);
  var defaultOptions = {mapId:"7acc486bc4b7f6c5", center: centerCoordinates, zoom: 8, icon: image, };
  map = new google.maps.Map(mapLayer, defaultOptions);

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  var start = localStorage.getItem("Origin");

  var end = localStorage.getItem("Destination");
  var tripStart=document.getElementById('trip-start'); //displaying start and end point on the page
   var tripEnd=document.getElementById('trip-end');
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
        console.log(google.maps.Distance);
      }
    }
  );
}

function GetInfo(){
  var destination = localStorage.getItem("Destination");

  fetch('https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q='+destination+'&appid=88f279a121e9f3c2da0f526adc7c151d')
  .then(Response => Response.json())
  .then(data => {
    console.log(data);
      for(i = 0; i<5; i++){
          document.getElementById("day" + (i+1) + "Min").innerHTML = "Low: " + Math.round(data.list[i].main.temp_min).toFixed(1)+ "0°";
      }
      for(i = 0; i<5; i++){
          document.getElementById("day" + (i+1) + "Max").innerHTML = "High: " + Math.round(data.list[i].main.temp_max).toFixed(2)+ "°";
      }
      for(i = 0; i<5; i++){
          document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
      }
  })
}

var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CheckDay(day){
  if(day + d.getDay() > 6){
      return day + d.getDay() - 7;
  }
  else{
      return day + d.getDay();
  }
}
for(i = 0; i<5; i++){
  document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}


saveBtn.addEventListener('click', function(){
  event.preventDefault()
  var tripStart=document.getElementById('trip-start').innerHTML
  var tripEnd=document.getElementById('trip-end').innerHTML
  var save={}
  save.origin=tripStart;
  save.destination=tripEnd;
  var savedTrip=JSON.parse(localStorage.getItem('Saved'));
  if (save==null){
    var savedTrip=[];
    savedTrip.push(save);
    localStorage.setItem("Saved", JSON.stringify(savedTrip));
  } else{
    savedTrip.push(save);
      localStorage.setItem("Saved", JSON.stringify(savedTrip));
  }
 
  
}, {once:true})
