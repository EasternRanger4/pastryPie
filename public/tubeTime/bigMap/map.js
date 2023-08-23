var map = L.map('map').setView([51.505, -0.09], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        var station = L.icon({
            iconUrl: 'icon.png',
            iconSize: [10, 10],
        });

        async function getStations(lineName) {
            const url = '/tfl/bigMap'; // Replace with the actual API endpoint
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: lineName })
            });
            const data = await response.json();
            console.log(data);
            return data;
        }

        async function setData() {
            const stations = await getStations("bakerloo");
            var markers = []; // Array to store marker instances

            for (i in stations.jsonData) {
                const markerCoordinates = [stations.jsonData[i].lat, stations.jsonData[i].lon];
                var marker = L.marker(markerCoordinates, { icon: station }).addTo(map);
                marker.bindPopup(stations.jsonData[i].commonName);
                markers.push(marker); // Add marker to the array
            }

            // Create a Polyline between consecutive markers
            for (let i = 0; i < markers.length - 1; i++) {
                L.polyline([markers[i].getLatLng(), markers[i + 1].getLatLng()], {
                    color: 'blue',
                    weight: 2
                }).addTo(map);
            }
        }

        setData();