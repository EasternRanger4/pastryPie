async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error('Geolocation is not supported'));
        }
    });
}

function onStartTemp() {
    const txt2 = `            AS THIS WEBSITE IS NOT SECURE WE DO NOT HAVE ABILATYS TO USE GEOLOCATION <br>
    To use this service please enter your lon and lat <br>
    The location has to be within the Greater London Area <br>
    Lat: <input type="text" id="lat"> <br>            
    Lon: <input type="text" id="lon"> <br>           
    <br>
    <button onclick="onStart()">Submit</button>`
    document.getElementById("button").innerHTML= "";
    document.getElementById("content").innerHTML= txt2;
}

async function onStart() {
    const lon = document.getElementById("lon").value;
    const lat = document.getElementById("lat").value;
    console.log(lon, lat)
    const response = await fetch("/tfl/busPoints", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lon,
            lat
        }),
    });
    const data = await response.json();
    console.log(data);
    
    //Set Map
    const content = `<h1> All Bus Stops Near You </h1> <div id="map"><br></div> <div id="content-c"></div>`
    const button = `<button onclick="onStart()">Restart</button>`
    document.getElementById("content").innerHTML = content;
    document.getElementById("button").innerHTML = button;
    var map = L.map('map').setView([data.resData.centrePoint[0], data.resData.centrePoint[1]], 15);
    var roundal = L.icon({
        iconUrl: 'roundal.png',
        iconSize: [38, 38]
    });
    var person = L.icon({
        iconUrl: 'person.png',
        iconSize: [30, 50]
    });
    const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`;
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(map);
    L.marker([data.resData.centrePoint[0], data.resData.centrePoint[1]], {icon : person}).addTo(map);

    //Set C
    const busStops = data.resData.stopPoints;
    var toSet = "";
    const markers = []; // Array to store markers
    const tableDflt2 = `<br>
        <table id="myTable2"><therd><tr>
        <th>Name</th>
        <th>Lines</th>     
        </tr></thread><tbody id="tableData"> </tbody>
        </table>`;
    document.getElementById("content-c").innerHTML= tableDflt2;
    for (point in busStops) {
        if (busStops[point].lines[0] == undefined) {
        } else {
            var lines = "";
            for (line in busStops[point].lines) {
                lines += `<span id="line"> ${busStops[point].lines[line].name} </span>`
            } 
            let variable = busStops[point].indicator;
            if (variable.includes("->")) {
                variable = variable.replace(/->/g, "");
            } else if (variable == "Stop") {
                variable = "";
            }
            const name = `${busStops[point].commonName} ${variable}`
            const id = busStops[point].id
            const send = [id, name]
            window.windowSend = send
            toSet += `<tr onclick="startTime()"><td>${busStops[point].commonName} ${variable}</td><td>${lines}</td></tr>`;
            const marker = L.marker([busStops[point].lat, busStops[point].lon], {icon: roundal}).addTo(map);
            marker.bindTooltip(name, { permanent: true, direction: 'top' });
            markers.push(marker);
            marker.on('click', () => {
                seeTimes(send)
            });
        }
    }
    
    document.getElementById("tableData").innerHTML = toSet;
}

async function seeTimes(send) {
    const id = send[0];
    const name = send[1];
    console.log(send)
    const response = await fetch("/tfl/busTimes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id
        }),
    });
    const data = await response.json();
    console.log(data);
    const currentTime = new Date().toLocaleTimeString();
    const tableDflt = `
        <h1>${name}</h1>
        Last Refreshed ${currentTime}
        <table id="myTable2"><therd><tr>
        <th onclick="sortTable(0)">Bus</th>
        <th onclick="sortTable(1)">Time</th>
        <th onclick="sortTable(2)">To</th>
        <th onclick="sortTable(3)">Vehicle Id</th>        
        </tr></thread><tbody id="tableData"> </tbody>
        </table>`;
    document.getElementById("content").innerHTML= tableDflt;
    
    var tabeleDta = "";
    for (bus in data.resData) {
        const timeToStation = Math.round(data.resData[bus].timeToStation / 60);
        tabeleDta += `<tr><td>${data.resData[bus].lineName}</td>
        <td>${timeToStation}</td>
        <td>${data.resData[bus].destinationName}</td>
        <td>${data.resData[bus].vehicleId}</td>
        </tr>`
    }
    window.windowSend = send
    const button = `<button onclick="onStartTemp()">Restart</button><button onclick="startTime()">Refresh</button>`
    document.getElementById("tableData").innerHTML = tabeleDta;
    document.getElementById("button").innerHTML = button;
    sortTable(1)
}

function startTime() {
    seeTimes(windowSend);
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable2");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    
    while (switching) {
      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        
        // Parse the time values as numbers for comparison
        var xValue = parseFloat(x.innerHTML);
        var yValue = parseFloat(y.innerHTML);
        
        if (dir === "asc") {
          if (xValue > yValue) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (xValue < yValue) {
            shouldSwitch = true;
            break;
          }
        }
      }
      
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  
//onStart();
  