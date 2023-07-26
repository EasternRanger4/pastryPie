const express = require('express');
const fs = require('fs');
const router = express.Router();
router.use(express.json());
const { v4: uuidv4 } = require('uuid');

const newsFile = './data/pages/news.json';
const updateFile = './data/pages/updates.json';

// Function to read the contents of a JSON file
function readJsonFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);
    return jsonData;
  } catch (err) {
    return null;
  }
}

function editItemById(filePath, idToEdit, newData) {
  try {
    // Read the existing JSON data from the file
    const existingData = readJsonFile(filePath);

    if (!Array.isArray(existingData)) {
      throw new Error('Data in the file is not an array.');
    }

    // Find the index of the item with the matching ID
    const indexToEdit = existingData.findIndex((item) => item.id === idToEdit);

    if (indexToEdit === -1) {
      console.log('Item with the provided ID not found in the array.');
      return;
    }

    // Update the item with the new data
    existingData[indexToEdit] = { ...existingData[indexToEdit], ...newData };

    // Convert the updated data to JSON format with indentation
    const jsonData = JSON.stringify(existingData, null, 2);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, jsonData, 'utf8');

  } catch (err) {
    console.error('Error editing item in JSON file:', err.message);
  }
}

function writeJsonFile(filePath, newEntry) {
  try {
    // Read the existing JSON data from the file
    const existingData = readJsonFile(filePath);

    // If the file does not exist or is empty, create a new array to store the data
    const dataToWrite = existingData || [];

    // If the data is not an array, convert it into an array with the data as the first element
    const dataArray = Array.isArray(dataToWrite) ? dataToWrite : [dataToWrite];

    // Generate a random ID using uuid
    const randomId = uuidv4();

    // Add the random ID to the new entry
    const entryWithId = { id: randomId, ...newEntry };

    // Add the new entry with the random ID to the array
    dataArray.push(entryWithId);

    // Convert the data to JSON format with indentation
    const jsonData = JSON.stringify(dataArray, null, 2);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, jsonData, 'utf8');
  } catch (err) {
    console.error('Error writing to JSON file:', err.message);
  }
}

function deleteItemById(filePath, idToDelete) {
  try {
    // Read the existing JSON data from the file
    const existingData = readJsonFile(filePath);

    if (!Array.isArray(existingData)) {
      throw new Error('Data in the file is not an array.');
    }


    // Find the index of the item with the matching ID
    const indexToDelete = existingData.findIndex((item) => item.id === idToDelete);

    if (indexToDelete === -1) {
      console.log('Item with the provided ID not found in the array.');
      return;
    }

    // Remove the item from the array
    const updatedData = existingData.filter((item, index) => index !== indexToDelete);

    // Convert the updated data to JSON format with indentation
    const jsonData = JSON.stringify(updatedData, null, 2);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, jsonData, 'utf8');

  } catch (err) {
    console.error('Error deleting item from JSON file:', err.message);
  }
}



//Get New Pages
router.get('/getNews', (request, response) => {
  try {
    const data = readJsonFile(newsFile);
    response.json({ message: true, content: data });
  } catch (err) {
    response.json({ message: false, error: 'Error reading news data' });
  }
});

//Get new news 
router.post('/newNews', (request, response) => {
  try {
    writeJsonFile(newsFile, request.body)
    response.json({ message: true});
  } catch (err) {
    response.json({ message: false, error: 'Error creating new update' });
  }
});

//del news 
router.post('/delNews', (request, response) => {
  try {
    deleteItemById(newsFile, request.body.id)
    response.json({ message: true});
  } catch (err) {
    response.json({ message: false, error: 'Error creating new update' });
  }
});

//get upfate
router.get('/getUpdates', (request, response) => {
  try {
    const data = readJsonFile(updateFile);
    response.json({ message: true, content: data });
  } catch (err) {
    response.json({ message: false, error: 'Error reading updates data' });
  }
});

//New update
router.post('/newUpdate', (request, response) => {
  try {
    writeJsonFile(updateFile, request.body)
    response.json({ message: true});
  } catch (err) {
    response.json({ message: false, error: 'Error creating new update' });
  }
});

//del Update
router.post('/delUpdate', (request, response) => {
  try {
    deleteItemById(updateFile, request.body.id)
    response.json({ message: true});
  } catch (err) {
    response.json({ message: false, error: 'Error creating new update' });
  }
});

router.post('/editlUpdate', (request, response) => {
  try {
    editItemById(updateFile, request.body.id, request.body)
    response.json({ message: true});
  } catch (err) {
    response.json({ message: false, error: 'Error creating new update' });
  }
});

module.exports = router;
