//var startPointInput = document.querySelector('#start-point').value
//var destinationInput = document.querySelector('#destination').value
var searchBtn = document.querySelector('#start-btn')
//var saveBtn=document.getElementById('save-Btn');
//console.log(startPointInput)

var startCity = []
var endCity = []



var storeCitySearch = function (event) {
  event.preventDefault()
  var startPointInput = document.querySelector('#start-point').value
  var destinationInput = document.querySelector('#destination').value
 

  startCity.unshift(startPointInput)
endCity.unshift(destinationInput)
localStorage.setItem("Origin", startCity)
localStorage.setItem("Destination", endCity)
console.log(endCity)
}

searchBtn.addEventListener("click", function(event){
  event.preventDefault()
  var startPointInput = document.querySelector('#start-point').value
  var destinationInput = document.querySelector('#destination').value
  
  console.log(startPointInput, destinationInput);
  
  if (startPointInput == false || destinationInput == false){
    document.getElementById('alert').textContent='Please enter a valid city name'
    console.log('error');
    return;
  } else{
    var startCity = []
    var endCity = []
    startCity.unshift(startPointInput)
    endCity.unshift(destinationInput)
    localStorage.setItem("Origin", startCity)
    localStorage.setItem("Destination", endCity)
    console.log(endCity)
    location.replace("./trip.html")
  }
}, )



