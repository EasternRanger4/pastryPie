const express = require('express');
const fetch = require('isomorphic-fetch');
const router = express.Router();

// TFL Bike Points
router.get('/bikePoints', async (request, response) => {
  const tflKey = process.env.KEY;
  const url = `https://api.tfl.gov.uk/BikePoint?app_id=${tflKey}`;
  const tflResponse = await fetch(url);
  const tflBikePoint = await tflResponse.json();
  response.json({ message: true, tflBikePoint });
});

// TFL Road Disruptions
router.get('/roadDis', async (request, response) => {
  const tflKey = process.env.KEY;
  const url = `https://api.tfl.gov.uk/Road/All/Disruption?stripContent=false&app_id=${tflKey}`;
  const tflResponse = await fetch(url);
  const tflRoadDis = await tflResponse.json();
  response.json({ message: true, tflRoadDis });
});

// TFL Train Status
router.get('/trainStatus', async (request, response) => {
  const tflKey = process.env.KEY;
  const tubeURL = `https://api.tfl.gov.uk/line/mode/tube/status?app_id=${tflKey}`;
  const tubeRes = await fetch(tubeURL);
  const tubeDta = await tubeRes.json();
  const elizabethURL = `https://api.tfl.gov.uk/line/mode/elizabeth-line/status?app_id=${tflKey}`;
  const elizabethRes = await fetch(elizabethURL);
  const elizabethDta = await elizabethRes.json();
  const dlrURL = `https://api.tfl.gov.uk/line/mode/dlr/status?app_id=${tflKey}`;
  const dlrRes = await fetch(dlrURL);
  const dlrDta = await dlrRes.json();
  const overgroundURL = `https://api.tfl.gov.uk/line/mode/overground/status?app_id=${tflKey}`;
  const overgroundRes = await fetch(overgroundURL);
  const overgroundDta = await overgroundRes.json();
  const tramURL = `https://api.tfl.gov.uk/line/mode/tram/status?app_id=${tflKey}`;
  const tramRes = await fetch(tramURL);
  const tramDta = await tramRes.json();

  response.json({
    message: true,
    tubeDta,
    elizabethDta,
    dlrDta,
    overgroundDta,
    tramDta
  });
});

// TFL Stop Points
router.post('/stopPoints', async (request, response) => {
  const tflKey = process.env.KEY;
  var line = request.body.line;
  const url = `https://api.tfl.gov.uk/line/${line}/stoppoints?app_id=${tflKey}`;
  const tflResponse = await fetch(url);
  const data = await tflResponse.json();
  var line = ""
  if (request.body.line === "bakerloo") {
    line = "Bakerloo";
  } else if (request.body.line === "central") {
    line = "Central";
  } else if (request.body.line === "circle") {
    line = "Circle";
  } else if (request.body.line === "district") {
    line = "District";
  } else if (request.body.line === "hammersmith-city") {
    line = "Hammersmith & City";
  } else if (request.body.line === "jubilee") {
    line = "Jubilee";
  } else if (request.body.line === "metropolitan") {
    line = "Metropolitan";
  } else if (request.body.line === "northern") {
    line = "Northern";
  } else if (request.body.line === "piccadilly") {
    line = "Piccadilly";
  } else if (request.body.line === "victoria") {
    line = "Victoria";
  } else if (request.body.line === "waterloo-city") {
    line = "Waterloo & City";
  } else if (request.body.line === "dlr") {
    line = "DLR";
  } else if (request.body.line === "waterloo-city") {
    line = "Waterloo & City";
  } else if (request.body.line === "tram") {
    line = "Tram";
  } else if (request.body.line === "elizabeth") {
    line = "Elizabeth Line";
  }else {
    line = request.body.line
  }
  response.json({ data, line });
});

// TFL Bus Points
router.post('/busPoints', async (request, response) => {
  const tflKey = process.env.KEY;
  const lat = request.body.lat;
  const lon = request.body.lon;
  const url = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=700&app_id=${tflKey}`;
  const tflResponse = await fetch(url);
  const resData = await tflResponse.json();
  response.json({ message: true, resData });
});

// TFL Bus Times
router.post('/busTimes', async (request, response) => {
  const tflKey = process.env.KEY;
  const id = request.body.id;
  const url = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals?app_id=${tflKey}`;
  const tflResponse = await fetch(url);
  const resData = await tflResponse.json();
  console.log(resData)
  response.json({ message: true, resData });
});

module.exports = router;
