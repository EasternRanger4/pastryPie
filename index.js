const express = require("express");
const Datastore = require('nedb');
const { request } = require("http");
var fs = require('fs');
const https = require('https');
require('dotenv').config()
const nodemailer = require('nodemailer');
const fsN = require('fs-extra');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const protobuf = require('protobufjs'); 
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");


const app = express();
app.use(express.json());

//Requer api files 
const cocktailRoutes = require('./apiRequests/cocktailRoutes');
const tflRoutes = require('./apiRequests/tflRoutes');
const adminRoutes = require('./apiRequests/admin');
const loginRoutes = require('./apiRequests/loginRoutes');
const updateUser = require('./apiRequests/updateUser');
const externalRoutes = require('./apiRequests/externalRoutes');
const pinCodes = require('./apiRequests/pinCodes');
const pokemon = require('./apiRequests/pokemon.js');
const fortnite = require('./apiRequests/fortnite.js');
const space = require('./apiRequests/space.js');
const coffee = require('./apiRequests/coffee.js');
const pages = require('./apiRequests/pageUpdate.js');
const music = require('./apiRequests/music.js');
const nycSubway = require('./apiRequests/newYorkSubway.js');
const airData = require('./apiRequests/airData.js');

//Load Databases
const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
databaseLoginHistory.loadDatabase();
const pageViews = new Datastore("data/history/pageViews.db");
pageViews.loadDatabase();

//APP.USE
app.use('/cocktails', cocktailRoutes);
app.use('/tfl', tflRoutes);
app.use('/admin', adminRoutes);
app.use('/login', loginRoutes);
app.use('/updateUser', updateUser);
app.use('/external', externalRoutes);
app.use('/pinCodes', pinCodes);
app.use('/pokemon', pokemon);
app.use('/fortnite', fortnite);
app.use('/space', space);
app.use('/coffee', coffee);
app.use('/pages', pages);
app.use('/music', music);
app.use('/mta', nycSubway);
app.use('/airData', airData);




app.post('/geocode', async (req, res) => {
  try {
    const address = req.body.address;
    const apiKey = 'bd4747c0a1384a00a9490be28c8a86c6';

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&countrycode=gb&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json({ message: true, content: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/pageView', (request, response) => {
  const dataToSet = {
    ipAddress: request.body.ipAddress,
    userAgent: request.body.userAgent
  };

  const filePath = 'data/history/pageViews.json'; // Path to your JSON file

  // Step 1: Read the existing JSON file
  fs.readFile(filePath, 'utf8', (readErr, rawData) => {
    if (readErr) {
      console.error('Error reading file:', readErr);
      response.status(500).json({ error: 'An error occurred while reading the file.' });
      return;
    }

    try {
      const jsonData = JSON.parse(rawData);

      // Step 2: Modify Data
      jsonData.push(dataToSet);

      // Step 3: Stringify JSON
      const updatedJsonString = JSON.stringify(jsonData, null, 2);

      // Step 4: Write to File
      fs.writeFile(filePath, updatedJsonString, 'utf8', writeErr => {
        if (writeErr) {
          console.error('Error writing file:', writeErr);
          response.status(500).json({ error: 'An error occurred while writing to the file.' });
          return;
        }

        response.status(200).json({ message: 'Page view data logged successfully.' });
      });
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      response.status(500).json({ error: 'An error occurred while parsing JSON.' });
    }
  });
});

//Test Command
app.post('/test', (request, response) => {
  console.log("");
  response.json({ message: true});
  console.log("****TEST**** ")
  console.log(request.body)
});


let port = 3000;
app.use(express.static("public"));
app.listen(port, () => console.log(`Listening at port ${port}`));