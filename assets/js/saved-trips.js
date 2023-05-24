
// Adds locally stored trips into the table in HTML
function displaySaved() {
  var savedTrips = JSON.parse(localStorage.getItem("Saved"));
  console.log(savedTrips);
  if (savedTrips !== null) {
    for (var i = 0; i < savedTrips.length; i++) {
      addRow();
      function addRow() {
        var table = document.querySelector(".container");
        var row = table.insertRow(-1);

        var tbStart = row.insertCell(0);
        var tbEnd = row.insertCell(1);
        var clear = row.insertCell(2);
        tbStart.textContent = savedTrips[i].origin;
        tbEnd.textContent = savedTrips[i].destination;
        var clearBtn = document.createElement("button");
        clear.appendChild(clearBtn);
        clearBtn.textContent = "X";

        clearBtn.addEventListener("click", function () {
          var j = clearBtn.parentElement.parentElement.rowIndex;
          console.log(j);
          table.deleteRow(j);
          savedTrips.splice(j - 1, 1);
          console.log(savedTrips);
          localStorage.setItem("Saved", JSON.stringify(savedTrips));
        });
        table.addEventListener("click", function () {
          var j = event.target.parentElement.rowIndex;
          console.log(j);
          var startCity = savedTrips[j - 1].origin;
          var endCity = savedTrips[j - 1].destination;

          //startCity.unshift(startPointInput)
          //endCity.unshift(destinationInput)
          localStorage.setItem("Origin", startCity);
          localStorage.setItem("Destination", endCity);
          console.log(endCity);
          //storeCitySearch;
          location.replace("trip.html");
        });
      }
    }
  }
}

displaySaved();
