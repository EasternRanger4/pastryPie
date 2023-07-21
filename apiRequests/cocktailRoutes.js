const express = require("express");
const fs = require('fs');
const router = express.Router();
const nodemailer = require('nodemailer');

const databaseLoginHistory = "data/history/loginHistory.json";
const cocktailMenuFile = "data/client/cocktails/cocktails.json";
const cocktailOrdersFile = "data/client/cocktails/cocktailOrders.json";
const pageViewsFile = "data/history/pageViews.json";
const cocktailHistoryFile = "data/client/cocktails/cocktailHistory.json";

// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}

// Helper functions to read/write JSON files
function readJSONFile(file) {
  try {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading JSON file '${file}': ${err}`);
    return [];
  }
}

function writeJSONFile(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data));
  } catch (err) {
    console.error(`Error writing JSON file '${file}': ${err}`);
  }
}

// Generate unique ID
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get menu route
router.post('/menu', (request, response, next) => {
  const cocktailMenu = readJSONFile(cocktailMenuFile);
  response.status(200).json({ message: true, content: cocktailMenu, type: request.body.type });

  const historyEntry = {
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/menu"
  };
  const cocktailHistory = readJSONFile(cocktailHistoryFile);
  cocktailHistory.push(historyEntry);
  writeJSONFile(cocktailHistoryFile, cocktailHistory);
});

// Add menu route
router.post('/addMenu', (request, response, next) => {
  const cocktailMenu = readJSONFile(cocktailMenuFile);
  const name = request.body.name;
  const info = request.body.info;
  const url = request.body.url;
  const cat = request.body.cat;
  const insertedEntry = { _id: generateUniqueId(), name, info, url, cat };
  cocktailMenu.push(insertedEntry);
  writeJSONFile(cocktailMenuFile, cocktailMenu);
  response.json({ message: true });

  const historyEntry = {
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/addMenu"
  };
  const cocktailHistory = readJSONFile(cocktailHistoryFile);
  cocktailHistory.push(historyEntry);
  writeJSONFile(cocktailHistoryFile, cocktailHistory);
});

// Get orders route
router.post('/orders', (request, response, next) => {
  const cocktailOrders = readJSONFile(cocktailOrdersFile);
  response.json({ message: true, content: cocktailOrders });

  const historyEntry = {
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/orders"
  };
  const cocktailHistory = readJSONFile(cocktailHistoryFile);
  cocktailHistory.push(historyEntry);
  writeJSONFile(cocktailHistoryFile, cocktailHistory);
});

// Add order route
router.post('/addOrder', (request, response, next) => {
  const name = request.body.name;
  const cocktail = request.body.cocktail;
  const notes = request.body.notes;
  const contact = request.body.contact;
  const insertedEntry = { _id: generateUniqueId(), name, cocktail, notes, contact };
  const cocktailOrders = readJSONFile(cocktailOrdersFile);
  cocktailOrders.push(insertedEntry);
  writeJSONFile(cocktailOrdersFile, cocktailOrders);
  response.json({ message: true });

  const historyEntry = {
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/addOrder"
  };
  const cocktailHistory = readJSONFile(cocktailHistoryFile);
  cocktailHistory.push(historyEntry);
  writeJSONFile(cocktailHistoryFile, cocktailHistory);

  sendEmail(insertedEntry);
});

// Delete menu route
router.post('/delMenu', (request, response, next) => {
  const itemId = request.body._id;
  const cocktailMenu = readJSONFile(cocktailMenuFile);
  const index = cocktailMenu.findIndex(item => item._id === itemId);
  if (index !== -1) {
    cocktailMenu.splice(index, 1);
    writeJSONFile(cocktailMenuFile, cocktailMenu);
    response.json({ message: true });
  } else {
    response.json({ message: false, type: "item not found" });
  }

  const historyEntry = {
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/delMenu"
  };
  const cocktailHistory = readJSONFile(cocktailHistoryFile);
  cocktailHistory.push(historyEntry);
  writeJSONFile(cocktailHistoryFile, cocktailHistory);
});

// Get specific entry route
router.post('/getEnt', (request, response, next) => {
  const entryId = request.body._id;
  const cocktailMenu = readJSONFile(cocktailMenuFile);
  const entry = cocktailMenu.find(item => item._id === entryId);
  if (entry) {
    response.json({ message: true, content: entry });
  } else {
    response.json({ message: false, type: "error locating entry" });
  }

  const historyEntry = {
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/getEnt"
  };
  const cocktailHistory = readJSONFile(cocktailHistoryFile);
  cocktailHistory.push(historyEntry);
  writeJSONFile(cocktailHistoryFile, cocktailHistory);
});

// Update entry route
router.post('/updateEnt', (request, response, next) => {
  const updatedValues = {
    name: request.body.name,
    info: request.body.info,
    url: request.body.url,
    cat: request.body.cat
  };
  const entryId = request.body._id;
  const cocktailMenu = readJSONFile(cocktailMenuFile);
  const index = cocktailMenu.findIndex(item => item._id === entryId);
  if (index !== -1) {
    cocktailMenu[index] = { ...cocktailMenu[index], ...updatedValues };
    writeJSONFile(cocktailMenuFile, cocktailMenu);
    response.json({ message: true });
  } else {
    response.json({ message: false, type: "error locating entry" });
  }

  const historyEntry = {
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/updateEnt"
  };
  const cocktailHistory = readJSONFile(cocktailHistoryFile);
  cocktailHistory.push(historyEntry);
  writeJSONFile(cocktailHistoryFile, cocktailHistory);
});

// Delete order route
router.post('/delOrder', (request, response, next) => {
  const itemId = request.body._id;
  const cocktailOrders = readJSONFile(cocktailOrdersFile);
  const index = cocktailOrders.findIndex(item => item._id === itemId);
  if (index !== -1) {
    cocktailOrders.splice(index, 1);
    writeJSONFile(cocktailOrdersFile, cocktailOrders);
    response.json({ message: true });
  } else {
    response.json({ message: false, type: "item not found" });
  }

  const historyEntry = {
    userAgent: request.headers['user-agent'],
    pageRoute: "/cocktails/delOrder"
  };
  const cocktailHistory = readJSONFile(cocktailHistoryFile);
  cocktailHistory.push(historyEntry);
  writeJSONFile(cocktailHistoryFile, cocktailHistory);
});

// Email change route
router.post('/emailChange', (request, response) => {
  // Handle email change request
});

// Send email function
async function sendEmail(insertedEntry) {
  const password = process.env.GMAIL;
  const email = "kamran_tailor@hotmail.com";
  fs.readFile('data/pinCodes.json', 'utf8', (err, data) => {
    const jsonData = JSON.parse(data);
    const respondent = jsonData[3].pin
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
      to: respondent,
      subject: sub,
      text: txt
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      }
    });
  });
}

function getPinCode() {
  fs.readFile('data/pinCodes.json', 'utf8', (err, data) => {
    return data[3].pin
  });
}
// Error handling middleware (must be defined after routes)
router.use(errorHandler);

module.exports = router;
