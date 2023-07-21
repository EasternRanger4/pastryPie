const express = require("express");
const Datastore = require('nedb');
const app = express();
var fs = require('fs');
const { request } = require("http");
app.use(express.json());
require('dotenv').config()
const nodemailer = require('nodemailer');
const fsN = require('fs-extra');

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
const esLogin = require('./apiRequests/esLogin.js');

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
app.use('/esLogin', esLogin);




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

app.post('/pageView', async (request, responce) => {
  try {
    pageViews.insert({
      ipAddress: request.body.ipAddress,
      userAgent: request.body.userAgent
    });
    responce.json({message: true})
  } catch (error) {
    responce.json({message: false})
  }
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