const express = require("express");
const Datastore = require('nedb');
const app = express();
var fs = require('fs');
const { request } = require("http");
app.use(express.json());
require('dotenv').config()

//Requer api files 
const cocktailRoutes = require('./apiRequests/cocktailRoutes');
const tflRoutes = require('./apiRequests/tflRoutes');
const adminRoutes = require('./apiRequests/admin');

//Load Databases
const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
databaseLoginHistory.loadDatabase();
const cocktailMenu = new Datastore("data/client/cocktails/cocktails.db");
cocktailMenu.loadDatabase();
const cocktailOrders = new Datastore("data/client/cocktails/cocktailOrders.db");
cocktailOrders.loadDatabase();
const pageViews = new Datastore("data/history/pageViews.db");
pageViews.loadDatabase();

//APP.USE
app.use('/cocktails', cocktailRoutes);
app.use('/tfl', tflRoutes);
app.use('/admin', adminRoutes);

app.post("/updateUser", async (request, response) => {
  try {
    // Read the userdata.json file
    const data = fs.readFileSync('data/userdata.json', 'utf8');
    const userData = JSON.parse(data);

    // Find the user based on the provided userid
    const userIdToUpdate = request.body.userid;
    const userToUpdate = userData.find(user => user.userid === userIdToUpdate);

    if (request.body.admin == undefined) {
      if (userToUpdate) {
        // Update the user data with the provided values
        userToUpdate.fname = request.body.fname;
        userToUpdate.mname = request.body.mname;
        userToUpdate.lname = request.body.lname;
        userToUpdate.password = request.body.password;
        userToUpdate.dob = request.body.dob;

        // Save the updated data back to the file
        fs.writeFileSync('data/userdata.json', JSON.stringify(userData, null, 2), 'utf8');

        // Send a response indicating success
        response.json({ message: true });
      } else {
        response.json({ message: false, error: 'User not found with the provided userid.' });
      }
    } else if (request.body.admin == true) {
      if (userToUpdate) {
        // Update the user data with the provided values
        userToUpdate.fname = request.body.fname;
        userToUpdate.mname = request.body.mname;
        userToUpdate.lname = request.body.lname;
        userToUpdate.password = request.body.password;
        userToUpdate.username = request.body.username;
        userToUpdate.dob = request.body.dob;
        userToUpdate.userid = request.body.userid;
        userToUpdate.clinetApri = request.body.clinetApri;

        // Save the updated data back to the file
        fs.writeFileSync('data/userdata.json', JSON.stringify(userData, null, 2), 'utf8');

        // Send a response indicating success
        response.json({ message: true });
      } else {
        response.json({ message: false, error: 'User not found with the provided userid.' });
      }
    }
  } catch (error) {
    console.error(error);
    response.json({ message: false, error: 'An error occurred while updating the user data.' });
  }
});

//Pins 
app.post("/clinetPinCodes", async (request, responce) => {
  if (request.body.type = "NT") {
    const toSend = process.env.FCADMINPIN
    responce.json({ message: true, toSend});
  } 
});

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

//Login
app.post('/login', (request, response) => {
  const { username, password } = request.body;
  const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    response.json({ message: true, user });
    databaseLoginHistory.insert({message: true, username: username});
  } else {
    response.json({ message: false});
    databaseLoginHistory.insert({message: false, username: username});
  }
});
//Internal data check
app.post('/intDataCheck', (request, response) => {
  const userid = request.body.userID;
  const userSSC = request.body.userSSC;
  const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

  const user = users.find(user => user.userid === userid && user.userSSC === userSSC);

  if (user) {
    response.json({ message: true , content: user});
  } else {
    response.json({ message: false});
  }
});

let port = 3000;
app.use(express.static("public"));
app.listen(port, () => console.log(`Listening at port ${port}`));