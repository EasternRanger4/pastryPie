const express = require('express');
const cocktailRoutes = express.Router();
const Datastore = require('nedb');
const path = require('path');

// Require NeDB and initialize your databases
const cocktailMenu = new Datastore("data/client/cocktails.db");
cocktailMenu.loadDatabase();
const cocktailOrders = new Datastore("data/client/cocktailOrders.db");
cocktailOrders.loadDatabase();


cocktailRoutes.post("/", async (request, response) => {
    if (request.body.type == "seeOrders") {
      cocktailOrders.find({}, (err, documents) => {
        if (err) { response.json({ message: false, type: "error locating dataBase"});;} 
        else { response.json({ message: true, content: documents}) ;}
      });
    } else if (request.body.type == "addMenu") {
      const name = request.body.name;
      const info = request.body.info;
      const url = request.body.url;
      const cat = request.body.cat;
      const insertedEntry = { name, info, url, cat }; // Use insertedEntry instead of newEntry
      cocktailMenu.insert(insertedEntry, (err, insertedEntry) => { // Use insertedEntry instead of newEntry
        if (err) {
          response.json({ message: false, type: "error locating database" });
        } else {
          response.json({ message: true });
        }
      });
    } else if (request.body.type == "seeMenu") {
      cocktailMenu.find({}, (err, documents) => {
        if (err) { response.json({ message: false, type: "error locating dataBase"});;} 
        else { response.json({ message: true, content: documents, type: request.body.type}) ;}
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
      const entryId = request.body._id
      cocktailMenu.findOne({ _id: entryId }, (err, entry) => {
        if (err) {
          response.json({ message: false, type: "error locating entey" });
        } 
        if (entry) {
          response.json({ message: true, content: entry}); 
        } else {
          response.json({ message: false, type: "error locating entey" });
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
          response.json({ message: false, type: "error locating entey" });
          return;
        }
      
        if (numAffected > 0) {
          response.json({ message: true}); 
        } else {
          response.json({ message: false, type: "error locating entey" });
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
      const insertedEntry = { name, cocktail, notes, contact}; // Use insertedEntry instead of newEntry
      cocktailOrders.insert(insertedEntry, (err, insertedEntry) => { // Use insertedEntry instead of newEntry
        if (err) {
          response.json({ message: false, type: "error locating database" });
        } else {
          response.json({ message: true });
        }
      });
    }
  });

module.exports = cocktailRoutes;