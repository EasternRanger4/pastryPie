async function onStart() {
    var map = L.map('map').setView([51.505, -0.09], 12);
    var bikeIcon = L.icon({
      iconUrl: 'bicycle-pin.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
    });
    const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`;
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);
  
    try {
      const response = await fetch('/tflBikePoints');
      if (!response.ok) {
        throw new Error('Failed to fetch bike points data.');
      }
      const data = await response.json();
      const AllBikes = data.tflBikePoint;
      const markers = []; // Array to store markers
      for (let i = 0; i < AllBikes.length; i++) {
        const marker = L.marker([AllBikes[i].lat, AllBikes[i].lon], { icon: bikeIcon }).addTo(map);
        marker.bindPopup(AllBikes[i].commonName); // Add popup with common name
        markers.push(marker); // Store marker in the array
      }
    } catch (error) {
      console.error(error);
    }
  }
  
onStart();