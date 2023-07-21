const express = require("express");
const fs = require('fs');
const Datastore = require('nedb');
const router = express.Router();
const bcrypt = require('bcrypt');

const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
databaseLoginHistory.loadDatabase();
const pageViews = new Datastore("data/history/pageViews.db");
pageViews.loadDatabase();

//Login
router.post('/login', (request, response) => {
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
router.post('/intDataCheck', (request, response) => {
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

module.exports = router;
