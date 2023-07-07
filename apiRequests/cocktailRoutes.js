const express = require("express");
const Datastore = require('nedb');
const router = express.Router();

const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
databaseLoginHistory.loadDatabase();
const cocktailMenu = new Datastore("data/client/cocktails/cocktails.db");
cocktailMenu.loadDatabase();
const cocktailOrders = new Datastore("data/client/cocktails/cocktailOrders.db");
cocktailOrders.loadDatabase();
const pageViews = new Datastore("data/history/pageViews.db");
pageViews.loadDatabase();

router.post("/", async (request, response) => {
  if (request.body.type == "seeOrders") {
    cocktailOrders.find({}, (err, documents) => {
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else {
        response.json({ message: true, content: documents });
      }
    });
  } else if (request.body.type == "addMenu") {
    const name = request.body.name;
    const info = request.body.info;
    const url = request.body.url;
    const cat = request.body.cat;
    const insertedEntry = { name, info, url, cat };
    cocktailMenu.insert(insertedEntry, (err, insertedEntry) => {
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else {
        response.json({ message: true });
      }
    });
  } else if (request.body.type == "seeMenu") {
    cocktailMenu.find({}, (err, documents) => {
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else {
        response.json({ message: true, content: documents, type: request.body.type });
      }
    });
  } else if (request.body.type == "delMenuItem") {
    const itemId = request.body._id;
    cocktailMenu.remove({ _id: itemId }, {}, (err, numRemoved) => {
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else if (numRemoved === 0) {
        response.json({ message: false, type: "item not found" });
      } else {
        response.json({ message: true });
      }
    });
  } else if (request.body.type == "getEnt") {
    const entryId = request.body._id;
    cocktailMenu.findOne({ _id: entryId }, (err, entry) => {
      if (err) {
        response.json({ message: false, type: "error locating entry" });
      } else if (entry) {
        response.json({ message: true, content: entry });
      } else {
        response.json({ message: false, type: "error locating entry" });
      }
    });
  } else if (request.body.type == "updateEnt") {
    const updatedValues = {
      name: request.body.name,
      info: request.body.info,
      url: request.body.url,
      cat: request.body.cat
    };
    const entryId = request.body._id;
    cocktailMenu.update({ _id: entryId }, { $set: updatedValues }, {}, (err, numAffected) => {
      if (err) {
        response.json({ message: false, type: "error locating entry" });
        return;
      }

      if (numAffected > 0) {
        response.json({ message: true });
      } else {
        response.json({ message: false, type: "error locating entry" });
      }
    });
  } else if (request.body.type == "delOrder") {
    const itemId = request.body._id;
    cocktailOrders.remove({ _id: itemId }, {}, (err, numRemoved) => {
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else if (numRemoved === 0) {
        response.json({ message: false, type: "item not found" });
      } else {
        response.json({ message: true });
      }
    });
  } else if (request.body.type == "addOrder") {
    const name = request.body.name;
    const cocktail = request.body.cocktail;
    const notes = request.body.notes;
    const contact = request.body.contact;
    const insertedEntry = { name, cocktail, notes, contact };
    cocktailOrders.insert(insertedEntry, (err, insertedEntry) => {
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else {
        response.json({ message: true });
      }
    });
  }
});

module.exports = router;