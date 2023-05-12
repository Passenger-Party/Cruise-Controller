var startPointInput = document.querySelector('#start-point').value
var destinationInput = document.querySelector('#destination').value
var searchBtn = document.querySelector('#start-btn')
//var saveBtn=document.getElementById('save-Btn');
console.log(startPointInput)

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

searchBtn.addEventListener("click", storeCitySearch)


