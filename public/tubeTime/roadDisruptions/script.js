async function onStart() {
    var map = L.map('map').setView([51.505, -0.09], 10);
    var works = L.icon({
      iconUrl: 'road.png',
      iconSize: [38, 38],
    });
    var event = L.icon({
      iconUrl: 'planned.png',
      iconSize: [38, 38],
    });
    var serious = L.icon({
      iconUrl: 'serious.png',
      iconSize: [38, 38],
    });
    const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`;
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);
  
    const response = await fetch('/tflRoadDis');
    const data = await response.json();
    console.log(data)
    const markers = []; // Array to store markers
    
    for(item in data.tflRoadDis) {
        //console.log(data.tflRoadDis[item].severity)
        const prefItem = data.tflRoadDis[item];
        const lon = data.tflRoadDis[item].geography.coordinates[0];
        const lat = data.tflRoadDis[item].geography.coordinates[1];
        let marker = null; // Declare marker variable with initial value null
        //const marker = L.marker([lon, lat]).addTo(map);
        const text = `${prefItem.severity} - ${prefItem.location} ${prefItem.comments} ${prefItem.currentUpdate}`
        markers.push(marker); // Store marker in the array
        if (data.tflRoadDis[item].category == "Works") {
          const marker = L.marker([lat, lon], { icon: works }).addTo(map);
          marker.bindPopup(text); 
        } else if (data.tflRoadDis[item].category == "Planned events") { 
          const marker = L.marker([lat, lon], { icon: event }).addTo(map);  
          marker.bindPopup(text); 
        } else { 
          const marker = L.marker([lat, lon], { icon: serious }).addTo(map);  
          marker.bindPopup(text); 
        }
        markers.push(marker);
        console.log("Number Check")
    }

  }
  
onStart();