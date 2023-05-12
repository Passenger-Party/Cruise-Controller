var searchBtn = document.getElementById("start-btn");
var googleApi = "AIzaSyDOMF9Qvb_zajNGVx1sVSlEEZwEnANziH0";

var mapDiv = document.querySelector("#tempmapdiv");
var googleDirections =
  "https://www.google.com/maps/dir/?api=1&origin={start}&destination={end}&travelmode=driving&map_action=map";

var end = localStorage.getItem("Destination");
var saveBtn = document.getElementById("save-btn");
var tripTime;

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

  var tripStart = document.getElementById("trip-start"); //displaying start and end point on the page
  var tripEnd = document.getElementById("trip-end");

  tripStart.textContent = start;
  tripEnd.textContent = end;

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
      tripTimeEl = document.getElementById('trip-time');
      tripTime = response.routes[0].legs[0].duration.text;
      tripTimeEl.textContent = tripTime;
      console.log(tripTimeEl);
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      } else {
        window.alert("Problem in showing direction due to " + status);
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
  } else {
    savedTrip.push(save);
    localStorage.setItem("Saved", JSON.stringify(savedTrip));
  }
 
  
})
