let stationData = [
    {
      "commonName": "Harrow & Wealdstone Underground Station",
      "lat": 51.592268,
      "lon": -0.335217,
      "id": "940GZZLUHAW"
    },
    {
      "commonName": "North Wembley Underground Station",
      "lat": 51.562551,
      "lon": -0.304,
      "id": "940GZZLUNWY"
    },
    {
      "commonName": "South Kenton Underground Station",
      "lat": 51.570232,
      "lon": -0.308433,
      "id": "940GZZLUSKT"
    },
    {
      "commonName": "Kenton Underground Station",
      "lat": 51.581756,
      "lon": -0.31691,
      "id": "940GZZLUKEN"
    },
    {
      "commonName": "Harlesden Underground Station",
      "lat": 51.53631,
      "lon": -0.257883,
      "id": "940GZZLUHSN"
    },
    {
      "commonName": "Willesden Junction Underground Station",
      "lat": 51.532259,
      "lon": -0.244283,
      "id": "940GZZLUWJN"
    },
    {
      "commonName": "Stonebridge Park Underground Station",
      "lat": 51.543959,
      "lon": -0.275892,
      "id": "940GZZLUSGP"
    },
    {
      "commonName": "Wembley Central Underground Station",
      "lat": 51.552304,
      "lon": -0.296852,
      "id": "940GZZLUWYC"
    },
    {
      "commonName": "Kensal Green Underground Station",
      "lat": 51.530539,
      "lon": -0.225016,
      "id": "940GZZLUKSL"
    },
    {
      "commonName": "Queen's Park Underground Station",
      "lat": 51.534158,
      "lon": -0.204574,
      "id": "940GZZLUQPS"
    },
    {
      "commonName": "Kilburn Park Underground Station",
      "lat": 51.534979,
      "lon": -0.194232,
      "id": "940GZZLUKPK"
    },
    {
      "commonName": "Maida Vale Underground Station",
      "lat": 51.529777,
      "lon": -0.185758,
      "id": "940GZZLUMVL"
    },
    {
      "commonName": "Warwick Avenue Underground Station",
      "lat": 51.523263,
      "lon": -0.183783,
      "id": "940GZZLUWKA"
    },
    {
      "commonName": "Paddington Underground Station",
      "lat": 51.516581,
      "lon": -0.175689,
      "id": "940GZZLUPAC"
    },
    {
      "commonName": "Edgware Road (Bakerloo) Underground Station",
      "lat": 51.520299,
      "lon": -0.17015,
      "id": "940GZZLUERB"
    },
    {
      "commonName": "Marylebone Underground Station",
      "lat": 51.522322,
      "lon": -0.163207,
      "id": "940GZZLUMYB"
    },
    {
      "commonName": "Baker Street Underground Station",
      "lat": 51.522883,
      "lon": -0.15713,
      "id": "940GZZLUBST"
    },
    {
      "commonName": "Regent's Park Underground Station",
      "lat": 51.523344,
      "lon": -0.146444,
      "id": "940GZZLURGP"
    },
    {
      "commonName": "Oxford Circus Underground Station",
      "lat": 51.515224,
      "lon": -0.141903,
      "id": "940GZZLUOXC"
    },
    {
      "commonName": "Piccadilly Circus Underground Station",
      "lat": 51.51005,
      "lon": -0.133798,
      "id": "940GZZLUPCC"
    },
    {
      "commonName": "Charing Cross Underground Station",
      "lat": 51.50741,
      "lon": -0.127277,
      "id": "940GZZLUCHX"
    },
    {
      "commonName": "Embankment Underground Station",
      "lat": 51.507058,
      "lon": -0.122666,
      "id": "940GZZLUEMB"
    },
    {
      "commonName": "Waterloo Underground Station",
      "lat": 51.503299,
      "lon": -0.11478,
      "id": "940GZZLUWLO"
    },
    {
      "commonName": "Lambeth North Underground Station",
      "lat": 51.498808,
      "lon": -0.112315,
      "id": "940GZZLULBN"
    },
    {
      "commonName": "Elephant & Castle Underground Station",
      "lat": 51.494536,
      "lon": -0.100606,
      "id": "940GZZLUEAC"
    }
]
  

let canvasWidth = 800;
let canvasHeight = 600;
let latitudeMin = 51.3;
let latitudeMax = 51.7;
let longitudeMin = -0.5;
let longitudeMax = 0.3;


async function setup() {
    createCanvas(canvasWidth, canvasHeight);
    noLoop();

    // Draw connections between stations based on the order they appear in stationData
    for (let i = 0; i < stationData.length - 1; i++) {
        drawConnection(stationData[i], stationData[i + 1]);
    }

    // Draw stations after connections to overlay them
    for (let station of stationData) {
        let x = map(station.lon, longitudeMin, longitudeMax, 0, width);
        let y = map(station.lat, latitudeMax, latitudeMin, 0, height);
        drawStation(x, y);
    }
}

function drawStation(x, y, name) {
    fill(0);
    ellipse(x, y, 10, 10);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(name, x, y - 15);
}

function drawConnection(station1, station2) {
    let x1 = map(station1.lon, longitudeMin, longitudeMax, 0, width);
    let y1 = map(station1.lat, latitudeMax, latitudeMin, 0, height);
    let x2 = map(station2.lon, longitudeMin, longitudeMax, 0, width);
    let y2 = map(station2.lat, latitudeMax, latitudeMin, 0, height);

    stroke(150);
    line(x1, y1, x2, y2);
}

