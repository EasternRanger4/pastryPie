let stations;
let line;
let data;
let station;
let trainDta;

var loaderD = document.querySelector('.loader'); 
var serachD = document.querySelector('.Bwrapper'); 
var lineD = document.querySelector('.line'); 
var contentD = document.querySelector('#contentT'); 

const popup = document.getElementById('popup');

popup.style.display = "none"

serachD.style.display = 'none'; //flex
loaderD.style.display = 'none'; //block
lineD.style.display = 'block'; //flex
contentD.style.display = 'none'; //flex

async function onStart() {
    loaderD.style.display = 'block';
    line = document.getElementById("line").value;
    const responce = await fetch("/tfl/stopPoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({line}),
    });
    data = await responce.json(); 
    console.log(data);

    stations = [];
    for (i in data.data) {
        const r = data.data[i];
        stations.push(r.commonName) 
    }

    serachD.style.display = 'flex';
    loaderD.style.display = 'none'; 
    lineD.style.display = 'none'; 
    contentD.style.display = 'none'; 
}

const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('results');


async function setStation(stationFunc) {

    station = stationFunc;
    console.log(`Selected station: ${station}`);
    
    let id;
    for (i in data.data) {
        const r = data.data[i]
        if (data.data[i].commonName == station) {
            id = data.data[i].id
        }
    }

    const response = await fetch("/tfl/busTimes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id
        }),
    });
    const arrData = await response.json()
    console.log(arrData);
    displayData(arrData, stationFunc);
}

function displayData(arrData, stationFunc) {
    serachD.style.display = 'none'; 
    contentD.style.display = 'block'; 
    loaderD.style.display = 'none'; 
    lineD.style.display = 'none'; 

    const currentTime = new Date().toLocaleTimeString();

    const tableDflt = `
        <h1>${station}</h1>
        Last Refreshed ${currentTime}
        <table id="myTable2"><therd><tr>
        <th onclick="sortTable(0)">Line</th>
        <th onclick="sortTable(1)">Time</th>
        <th onclick="sortTable(2)">To</th>
        <th onclick="sortTable(3)">Vehicle Id</th>        
        </tr></thread><tbody id="tableData"> </tbody>
        </table>`;
    document.getElementById("contentT").innerHTML= tableDflt;
    

    var tabeleDta = "";
    trainDta = arrData.resData;
    for (i in arrData.resData) {
        const r = arrData.resData[i]
        const timeToStation = Math.round(r.timeToStation / 60);
        tabeleDta += `<tr onclick="moreInfo('${i}')"><td>${r.lineName}</td>
        <td>${timeToStation}</td>
        <td>${r.destinationName}</td>
        <td>${r.vehicleId}</td>
        </tr>`
    }
    document.getElementById("tableData").innerHTML= tabeleDta;
    sortTable(1)
    const button = `<button onclick="setStation('${stationFunc}')">Refresh</button>`
    document.getElementById("button").innerHTML= button;
}

function moreInfo(d) {
    console.log(trainDta[i])
    const r = trainDta[i]
    popup.style.display = "flex"

    const title = r.vehicleId;
    const content = `Current location: ${r.currentLocation} <br>
    Destination Name: ${r.destinationName}<br>
    Direction: ${r.direction}<br>
    Expected Arrival: ${r.expectedArrival}<br>
    Id: ${r.id}<br>
    Line Name: ${r.lineName}<br>
    Mode Name: ${r.modeName}<br>
    Platform Name: ${r.platformName}<br>
    Station Name: ${r.stationName}<br>
    Towards: ${r.towards}<br>
    Time To Station: ${r.timeToStation}`
    document.getElementById("popupTitle").innerHTML= title;
    document.getElementById("popupContent").innerHTML= content;
}

function closePop() {
    popup.style.display = "none"
}

function restart() {
    document.getElementById("button").innerHTML= "";
    serachD.style.display = 'none'; 
    contentD.style.display = 'none'; 
    loaderD.style.display = 'none'; 
    lineD.style.display = 'block'; 
}