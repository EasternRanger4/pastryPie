const express = require("express");
const fs = require('fs');
const Datastore = require('nedb');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const dataFilePath = 'data/music/top.json';
const databaseFilePath = 'data/music/top.json';
const filePath = 'data/music/top.json';


function readDataFile() {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading data file:', error);
      return [];
    }
  }
  
  function writeDataFile(data) {
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing data file:', error);
    }
  }

router.post('/update', async (request, response) => {
    const { songName, points, text, by } = request.body;
  
    try {
      // Convert the points value to an integer
      const parsedPoints = parseInt(points, 10);
  
      // Read the existing data from the JSON file
      const dataArray = readDataFile();
  
      // Check if the songName already exists in the data
      const existingSongIndex = dataArray.findIndex(item => item.songName === songName);
  
      if (existingSongIndex !== -1) {
        // If the songName exists, update the points value in the existing array
        dataArray[existingSongIndex].points += parsedPoints;
        dataArray[existingSongIndex].text = text;
      } else {
        // If the songName doesn't exist, create a new record
        dataArray.push({ songName, points: parsedPoints, text, by });
      }
  
      // Write the updated data back to the JSON file
      writeDataFile(dataArray);
  
      response.status(200).json({ message: 'Array added to the JSON file successfully.' });
    } catch (error) {
      response.status(500).json({ error: 'An error occurred while adding the array to the JSON file.' });
    }
});

// API endpoint to get all songs
router.get('/get', async (request, response) => {
    try {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading the file:', err);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    response.json({message: false, content: jsonData})
                } catch (parseError) {
                    response.json({message: false})
                }
            }
        });
    } catch (err) {
        response.status(500).json({ error: 'Something went wrong.' });
    }
});

// API endpoint to clear the database
router.delete('/clearSongs', async (request, response) => {
    try {
      // Use fs.truncate to clear the data in the JSON file
      await fs.promises.truncate(dataFilePath, 0);
      response.status(200).json({ message: 'Database cleared successfully.' });
    } catch (err) {
      console.error('Error clearing database:', err);
      response.status(500).json({ error: 'Something went wrong while clearing the database.' });
    }
  });

module.exports = router;
