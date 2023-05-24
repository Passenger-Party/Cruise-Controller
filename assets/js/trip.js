var searchBtn = document.getElementById("start-btn");

var mapDiv = document.querySelector("#tempmapdiv");

var end = localStorage.getItem("Destination");
var saveBtn = document.getElementById("save-btn");
var tripTime;

var map;
var waypoints;

// Function to push weatherAPI Info into html
function GetInfo() {
  var destination = localStorage.getItem("Destination");

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q=" +
      destination +
      "&appid=88f279a121e9f3c2da0f526adc7c151d"
  )
    .then((Response) => Response.json())
    .then((data) => {
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Min").innerHTML =
          "Low: " + Math.round(data.list[i].main.temp_min).toFixed(1) + "0°";
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Max").innerHTML =
          "High: " + Math.round(data.list[i].main.temp_max).toFixed(2) + "°";
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src =
          "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }
    });
}

var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Function to check the current day
function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}
for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

// Listener for save button to store trip info into saved trips
saveBtn.addEventListener(
  "click",
  function (event) {
    saveBtn.textContent = "SAVED!";
    event.preventDefault();
    var tripStart = document.getElementById("trip-start").innerHTML;
    var tripEnd = document.getElementById("trip-end").innerHTML;
    var save = {};
    save.origin = tripStart;
    save.destination = tripEnd;
    var savedTrip = JSON.parse(localStorage.getItem("Saved"));
    if (savedTrip == null) {
      var savedTrip = [];
      savedTrip.push(save);
      localStorage.setItem("Saved", JSON.stringify(savedTrip));
    } else {
      savedTrip.push(save);
      localStorage.setItem("Saved", JSON.stringify(savedTrip));
    }
  },
  { once: true }
);

// Script for Yelp API
var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer CbsZdL6zhyAnhaNO6DE79_1qyjLwvnjsCGMK59j0ByuEDX3XnsE1lVj_NLT-gayo6tikjdFLsa2XjjbxKWNrlF-jhz3FtfMpHjEVWYl2izBT4yRItsVIeLQTU4RZZHYx"
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

var destination = localStorage.getItem("Destination");

// Hotel Suggestions
fetch(
  "https://cors-anywhere-bc.herokuapp.com/api.yelp.com/v3/businesses/search?categories=hotels&sort_by=best_match&limit=5&location=" +
    destination,
  requestOptions
).then(function (response) {
  return response.json().then(function (data) {
    var placesToStay = document.querySelector("#placesToStay");
    placesToStay.textContent = "Places to stay in " + destination;

    for (var i = 0; i < data.businesses.length; i++) {
      var hotel = document.createElement("div");
      hotel.setAttribute("id", "hotel-" + (i + 1));
      placesToStay.appendChild(hotel);

      var hotelName = document.createElement("h4");

      var yelpHotelLink = document.createElement("a");
      yelpHotelLink.textContent = data.businesses[i].name;
      yelpHotelLink.setAttribute("href", data.businesses[i].url);
      yelpHotelLink.setAttribute("target", "_blank");
      hotelName.appendChild(yelpHotelLink);

      hotel.appendChild(hotelName);

      var hotelImg = document.createElement("img");
      hotelImg.setAttribute("src", data.businesses[i].image_url);
      hotel.appendChild(hotelImg);

      var hotelRating = document.createElement("p");
      hotelRating.textContent = "Rating: " + data.businesses[i].rating;
      hotel.appendChild(hotelRating);

      var hotelAddress = document.createElement("p");
      ß;
      hotelAddress.textContent =
        data.businesses[i].location.display_address[0] +
        " " +
        data.businesses[i].location.display_address[1];
      hotel.appendChild(hotelAddress);
    }
  });
});
// Restaurant Suggestions
fetch(
  "https://cors-anywhere-bc.herokuapp.com/api.yelp.com/v3/businesses/search?category=restaurant&location=" +
    destination +
    "&limit=5",
  requestOptions
).then(function (response) {
  return response.json().then(function (data) {
    console.log(data);

    var yelpEl = document.querySelector("#yelp");
    var destination = localStorage.getItem("Destination");
    var cityHeader = document.querySelector("#cityHeader");
    cityHeader.textContent = "Restaurants to try in " + destination;

    for (var i = 0; i < data.businesses.length; i++) {
      var restaurant = document.createElement("div");
      restaurant.setAttribute("id", "rest-" + i);
      cityHeader.appendChild(restaurant);

      var bizNameEl = document.createElement("h4");

      var yelpLink = document.createElement("a");
      yelpLink.textContent = data.businesses[i].name;
      yelpLink.setAttribute("href", data.businesses[i].url);
      yelpLink.setAttribute("target", "_blank");

      bizNameEl.appendChild(yelpLink);
      restaurant.appendChild(bizNameEl);

      var imageEl = document.createElement("img");
      imageEl.setAttribute("src", data.businesses[i].image_url);
      imageEl.className = "yelpImage";
      restaurant.appendChild(imageEl);

      var ratingEl = document.createElement("p");
      ratingEl.textContent = "Rating: " + data.businesses[i].rating;
      restaurant.appendChild(ratingEl);

      var addressEl = document.createElement("p");
      addressEl.textContent =
        data.businesses[i].location.display_address[0] +
        " " +
        data.businesses[i].location.display_address[1];
      restaurant.appendChild(addressEl);
    }
  });
});
