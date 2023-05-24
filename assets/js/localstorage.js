var directionsService = new google.maps.DirectionsService();

var searchBtn = document.querySelector('#start-btn')
var startCity = []
var endCity = []


// Function to store search terms into local storage
var storeCitySearch = function (event) {
  event.preventDefault()
  var startPointInput = document.querySelector('#start-point').value
  var destinationInput = document.querySelector('#destination').value
 

  startCity.unshift(startPointInput)
  endCity.unshift(destinationInput)
  localStorage.setItem("Origin", startCity)
  localStorage.setItem("Destination", endCity)
}

// Listener to search for trip
searchBtn.addEventListener("click", function(){
  var startPointInput = document.getElementById('start-point').value
  var destinationInput = document.getElementById('destination').value

  checkInputs(startPointInput, destinationInput);
}  
);

// Function to check if inputs are OK. If driving directions are not available, an error message will appear, otherwise it will take you to trip.html
function checkInputs(start, end) {
  directionsService.route(
    {
      origin: start,
      destination: end,
      optimizeWaypoints: true,
      travelMode: "DRIVING",
    },
    function (response) {
      console.log(response);
      if (response.status == 'OK') {
        var startCity = []
        var endCity = []
        startCity.unshift(start)
        endCity.unshift(end)
        localStorage.setItem("Origin", startCity)
        localStorage.setItem("Destination", endCity)
        console.log(endCity)
        location.replace("./trip.html")
      } else {
        document.getElementById('alert').textContent= 'Driving directions not available, please try again.';
      }
    })
};
  
