const express = require("express");
const Datastore = require('nedb');
const router = express.Router();
const fs = require('fs');
require('dotenv').config()
const nodemailer = require('nodemailer');

const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
databaseLoginHistory.loadDatabase();
const cocktailMenu = new Datastore("data/client/cocktails/cocktails.db");
cocktailMenu.loadDatabase();
const cocktailOrders = new Datastore("data/client/cocktails/cocktailOrders.db");
cocktailOrders.loadDatabase();
const pageViews = new Datastore("data/history/pageViews.db");
pageViews.loadDatabase();
const cocktailHistory = new Datastore("data/client/cocktails/cocktailHistory.db");
cocktailHistory.loadDatabase();


// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}

// Get menu
router.post('/menu', (request, response, next) => {
  cocktailMenu.find({}, (err, documents) => {
    if (err) {
      next(err); // Pass the error to the error handling middleware
    } else {
      response.status(200).json({ message: true, content: documents, type: request.body.type });
    }
  });
  cocktailHistory.insert({
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/menu"
  });
});


// Get Orders
router.post('/orders', (request, response, next) => {
  cocktailHistory.insert({
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/orders"
  });
  cocktailOrders.find({}, (err, documents) => {
    if (err) {
      next(err); // Pass the error to the error handling middleware
    } else {
      response.json({ message: true, content: documents });
    }
  });
});

router.post('/addMenu', (request, response, next) => {
  cocktailHistory.insert({
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/addMenu"
  });
  const name = request.body.name;
  const info = request.body.info;
  const url = request.body.url;
  const cat = request.body.cat;
  const insertedEntry = { name, info, url, cat };
  cocktailMenu.insert(insertedEntry, (err, insertedEntry) => {
    if (err) {
      next(err); // Pass the error to the error handling middleware
    } else {
      response.json({ message: true });
    }
  });
});

router.post('/delMenu', (request, response, next) => {
  cocktailHistory.insert({
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/delMenu"
  });
  const itemId = request.body._id;
  cocktailMenu.remove({ _id: itemId }, {}, (err, numRemoved) => {
    if (err) {
      next(err); // Pass the error to the error handling middleware
    } else if (numRemoved === 0) {
      response.json({ message: false, type: "item not found" });
    } else {
      response.json({ message: true });
    }
  });
});

router.post('/getEnt', (request, response, next) => {
  cocktailHistory.insert({
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/getEnt"
  });
  const entryId = request.body._id;
  cocktailMenu.findOne({ _id: entryId }, (err, entry) => {
    if (err) {
      next(err); // Pass the error to the error handling middleware
    } else if (entry) {
      response.json({ message: true, content: entry });
    } else {
      response.json({ message: false, type: "error locating entry" });
    }
  });
});

router.post('/updateEnt', (request, response, next) => {
  cocktailHistory.insert({
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/updateEnt"
  });
  const updatedValues = {
    name: request.body.name,
    info: request.body.info,
    url: request.body.url,
    cat: request.body.cat
  };
  const entryId = request.body._id;
  cocktailMenu.update({ _id: entryId }, { $set: updatedValues }, {}, (err, numAffected) => {
    if (err) {
      next(err); // Pass the error to the error handling middleware
      return;
    }

    if (numAffected > 0) {
      response.json({ message: true });
    } else {
      response.json({ message: false, type: "error locating entry" });
    }
  });
});

router.post('/delOrder', (request, response, next) => {
  cocktailHistory.insert({
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/delOrder"
  });
  const itemId = request.body._id;
  cocktailOrders.remove({ _id: itemId }, {}, (err, numRemoved) => {
    if (err) {
      next(err); // Pass the error to the error handling middleware
    } else if (numRemoved === 0) {
      response.json({ message: false, type: "item not found" });
    } else {
      response.json({ message: true });
    }
  });
});

router.post('/addOrder', (request, response, next) => {
  const name = request.body.name;
  const cocktail = request.body.cocktail;
  const notes = request.body.notes;
  const contact = request.body.contact;
  const insertedEntry = { name, cocktail, notes, contact };
  cocktailOrders.insert(insertedEntry, (err, insertedEntry) => {
    if (err) {
      next(err); // Pass the error to the error handling middleware
    } else {
      response.json({ message: true });
    }
  });
  cocktailHistory.insert({
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/addOrder"
  });
  sendEmail(insertedEntry)
});

router.post('/emailChange', (request, response) => {
  // Handle email change request
});

function sendEmail(insertedEntry) {
  const password = process.env.GMAIL;
  const email = "kamran_tailor@hotmail.com";

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: email,
      pass: password
    }
  });

  const sub = `New Cocktail Order`;
  const txt = `You have a new cocktail order
    Cocktail: ${insertedEntry.cocktail}
    Name: ${insertedEntry.name}
    Phone Number: ${insertedEntry.contact}
    Subject: ${insertedEntry.notes}`;

  // Define the email options
  const mailOptions = {
    from: 'kamran_tailor@hotmail.com',
    to: 'kamrantailor@gmail.com',
    subject: sub,
    text: txt
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else{
      console.log("Email sent successfully!");
    }
  });
}

// Error handling middleware (must be defined after routes)
router.use(errorHandler);

module.exports = router;
