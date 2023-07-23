const express = require("express");
const fs = require('fs');
const { request } = require("http");
const Datastore = require('nedb');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()
const fsN = require('fs-extra');

var adminTC = "";
var adminNT = "";
var extentionNT = "";

const filePath = 'data/pinCodes.json';

router.post("/TC", async (request, responce) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        try {
            const jsonData = JSON.parse(data);
            if (jsonData[0].pin == request.body.pin) {
                responce.json({ message: true});
            } else {
                responce.json({ message: false});
            }
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
    }); 
});

router.post("/NT", async (request, responce) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        try {
          const jsonData = JSON.parse(data);
          if (request.body.type = "NT") {
            if (jsonData[1].pin == request.body.userAdminPin) {
              responce.json({ message: true});
            } else {
              responce.json({ message: false});
            }
          }
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
    }); 
});

router.post("/NTa", async (request, responce) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        if (request.body.type = "NTa") {
          if (jsonData[1].pin == request.body.userAdminPin) {
            responce.json({ message: true});
          } else {
            responce.json({ message: false});
          }
        }
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
  }); 
});

router.post("/NTa", async (request, responce) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        try {
          const jsonData = JSON.parse(data);
          if (request.body.type = "NT") {
            if (jsonData[2].pin == request.body.pin) {
              responce.json({ message: true});
            } else {
              responce.json({ message: false});
            }
          }
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
    }); 
});

router.post("/CM", async (request, responce) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        if (request.body.type = "CM") {
          if (jsonData[4].pin == request.body.pin) {
            responce.json({ message: true});
          } else {
            responce.json({ message: false});
          }
        }
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
  }); 
});

router.post("/USA", async (request, responce) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        if (request.body.type = "USA") {
          if (jsonData[6].pin == request.body.pin) {
            responce.json({ message: true});
          } else {
            responce.json({ message: false});
          }
        }
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
  }); 
});

router.post("/getCodes", (request, responce) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        try {
          const jsonData = JSON.parse(data);
          responce.json({ message: true, content: jsonData});
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
    }); 
});
//updatePin

router.post("/updatePin", async (request, responce) => {
    const arrayNumber = request.body.array;
    const newPin = request.body.pin;
    const filePath = 'data/pinCodes.json';
  
    try {
      // Read the JSON file
      const jsonData = await fsN.readJson(filePath);
  
      // Find the object within the array based on arrayNumber
      const objToUpdate = jsonData[arrayNumber];
  
      // Update the pin value
      objToUpdate.pin = newPin;
  
      // Write the updated JSON data back to the file
      await fsN.writeJson(filePath, jsonData);
  
      responce.json({ message: true});
    } catch (err) {
      console.error(err);
      responce.json({ message: false});
    }
  });

module.exports = router;
