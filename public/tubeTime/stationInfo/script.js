function onStart() {
    const txt0 = `<select id="line">
    <option value="bakerloo">Bakerloo</option>
    <option value="central">Central</option>
    <option value="circle">Circle</option>
    <option value="district">District</option>
    <option value="hammersmith-city">Hammersmith & City</option>
    <option value="jubilee">Jubilee</option>
    <option value="metropolitan">Metropolitan</option>
    <option value="northern">Northern</option>
    <option value="piccadilly">Piccadilly</option>
    <option value="victoria">Victoria</option>
    <option value="waterloo-city">Waterloo & City</option>
    <option value="dlr">DLR</option>
    <option value="tram">Tram</option>
    
    </select>`
    const txt1 = `<button onclick="findStation()">Find Station</button>`
    document.getElementById("content").innerHTML= txt0;
    document.getElementById("button").innerHTML= txt1;
}

async function findStation() {
    const line = document.getElementById("line").value;
    const responce = await fetch("/tflStopPoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({line}),
    });
    const data = await responce.json();
    window.data = data;
    console.log(data);
    document.getElementById("content").innerHTML= data;
    const tableDflt = `
    <h1> ${data.line} </h1>
    <table>
        <therd>
            <tr>
                <th> Station </th>
                <th> ID </th>
                <th> Lines </th>
            </tr>
        </thread>
        <tbody id="tableData"> </tbody>
    </table>
    <div id="mapPlaceHolder"></div>`
    document.getElementById("content").innerHTML = tableDflt;
    let sortDirection = false;

    var dataHTML = "";
    for (person of data.data) {
        var lines = "";
        for (routeLine in person.lines){
            lines += `<span onclick="lineInfo('${person.lines[routeLine].uri}')"> ${person.lines[routeLine].name} </span>`;
        }//<span onclick="stationInfo("${person.id}")
        dataHTML += `<tr> 
        <td onclick="stationInfo('${person.id}')">${person.commonName}</td> 
        <td onclick="stationInfo('${person.id}')">${person.id}</td> 
        <td>${lines}</td></tr>`
    }
    const txt3 = `<button onclick="onStart()">Restart</button> <button onclick="viewMap()">View on Map</button>`
    document.getElementById("tableData").innerHTML= dataHTML;
    document.getElementById("button").innerHTML= txt3;
}

function lineInfo(uri) {
    console.log(uri);
}

function stationInfo(id) {
    const accData = window.data.data;
    for (station in accData) {
        if (accData[station].id == id) {
            console.log(accData[station])
            var modes = "";
            for (mode in accData[station].modes) {
                modes += `${accData[station].modes[mode]} `
            }
            var line = "";
            for (lines in accData[station].lines) {
                line += `${accData[station].lines[lines].name}  `
            }
            const tableDflt = `
            <h1> ${accData[station].commonName} </h1>
            <p> ${accData[station].commonName} is a station on the ${modes} served by the ${line}
            <table>
                <therd>
                    <tr>
                        <th> Key </th>
                        <th> Category </th>
                        <th> Value </th>
                    </tr>
                </thread>
                <tbody id="tableData"> </tbody>
            </table>
            <div id="mapPlaceHolder"></div>`
            document.getElementById("content").innerHTML= tableDflt;
            var txt5 = "";
            for (advancedItem in accData[station].additionalProperties){
                if (accData[station].additionalProperties[advancedItem].key =="SourceSystemPlaceId") {
                } else {
                    txt5 += `<tr><td>${accData[station].additionalProperties[advancedItem].key}</td>
                    <td>${accData[station].additionalProperties[advancedItem].category}</td>
                    <td>${accData[station].additionalProperties[advancedItem].value}</td></tr>`
                }
            }
            window.mapData = [accData[station].lon, accData[station].lat, accData[station].commonName]
            const txt6 = `<button onclick="onStart()">Restart</button> <button onclick="viewStationMap('${mapData}')">View on Map</button>`
            document.getElementById("tableData").innerHTML= txt5;
            document.getElementById("button").innerHTML= txt6;
        }
    }
}

function viewStationMap(mapData) {
    const txt4 = `<div id="map"></div>`;
    document.getElementById("mapPlaceHolder").innerHTML= txt4;
    var map = L.map('map').setView([51.505, -0.09], 13);
    var roundal = L.icon({
        iconUrl: 'roundal.png',
        iconSize: [30, 26],
    });
    const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`;
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(map);
    console.log(window.mapData)
    const marker = L.marker([window.mapData[1], window.mapData[0]], { icon: roundal }).addTo(map);
    marker.bindTooltip(window.mapData[2], { permanent: true, direction: 'top' });
}

function viewMap() {
    const txt4 = `<div id="map"></div>`;
    document.getElementById("mapPlaceHolder").innerHTML= txt4;
    var map = L.map('map').setView([51.505, -0.09], 13);
    var roundal = L.icon({
        iconUrl: 'roundal.png',
        iconSize: [30, 26],
    });
    const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`;
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(map);
    for (person of window.data.data) {
        const marker = L.marker([person.lat, person.lon], { icon: roundal }).addTo(map);
        marker.bindPopup(person.commonName);
      }
    }
onStart()