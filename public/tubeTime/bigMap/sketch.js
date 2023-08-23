let stationsData; // Store the station data here
let minLon, maxLon, minLat, maxLat; // Define coordinate ranges
const canvasWidth = 800;
const canvasHeight = 800;

async function fetchStationsData(lineName) {
  const url = '/tfl/bigMap'; // Replace with the actual API endpoint
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: lineName })
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data)
  return data;
}

async function setup() {
    createCanvas(canvasWidth, canvasHeight);
    
    try {
      const lineName = 'bakerloo'; // Replace with the desired line name
      const response = await fetchStationsData(lineName);
      stationsData = response.jsonData; // Assuming the data is in jsonData property
      
      // Calculate min and max coordinates for mapping
      minLon = Math.min(...stationsData.map(station => station.lon));
      maxLon = Math.max(...stationsData.map(station => station.lon));
      minLat = Math.min(...stationsData.map(station => station.lat));
      maxLat = Math.max(...stationsData.map(station => station.lat));
      
      // Start drawing after data is loaded
      drawStations();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function draw() {
    // No need to draw here since drawStations() handles the drawing
  }
  
  function drawStations() {
    // Draw stations using the calculated coordinates
    for (let station of stationsData) {
      let x = map(station.lon, minLon, maxLon, 0, canvasWidth);
      let y = map(station.lat, maxLat, minLat, 0, canvasHeight);
      
      ellipse(x, y, 10, 10);
      text(station.commonName, x + 10, y);
    }
  }