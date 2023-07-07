function onStart() {
    const txt0 = `<button onclick="search()">Search</button> <input type="location" id="locationInput" placeholder="Enter location or address">
  
    <p id="output"></p>`
    document.getElementById("content").innerHTML = txt0;
}

async function search() {
  const address = document.getElementById('locationInput').value;

  try {
    const response = await fetch('/geocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: address })
    });

    const data = await response.json();
    console.log(data);
    if (data) {
      var locations = "";
      for (i in data.content.results) {
        var locationQ = { lng: data.content.results[i].geometry.lng, lat: data.content.results[i].geometry.lat };
        console.log(locationQ);
        const func = JSON.stringify(data.content.results[i]);
        locations += `<div id="location"> ${data.content.results[i].formatted} <button onclick="selectSS()">Select</button></div>`;
      }
      document.getElementById("output").innerHTML = locations;
    }

  } catch (error) {
    console.log(error);
  }
}



function selectS(lona) {
  console.log(lona.geometry);
}

function selectSS(result) {
  // Access the result object properties as needed
  console.log(result.geometry);
}



//onStart()
