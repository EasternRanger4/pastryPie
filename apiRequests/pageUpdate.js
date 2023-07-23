const express = require('express');
const fs = require('fs');
const router = express.Router();
router.use(express.json());

const newsFile = './data/pages/news.json';
const updateFile = './data/pages/updates.json';

// Helper function to read the news data from the file
function readNewsData(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading news data:', err);
    return [];
  }
}

// Helper function to write news data to the file
function writeNewsData(newsData, filePath) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(newsData, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing news data:', err);
  }
}

router.get('/getNews', (request, response) => {
  try {
    const data = readNewsData(newsFile);
    response.json({message: true, content: data});
  } catch (err) {
    response.json({message: false})
  }
});

router.get('/getUpdates', (request, response) => {
  try {
    const data = readNewsData(updateFile);
    response.json({message: true, content: data});
  } catch (err) {
    response.json({message: false})
  }
});

router.post('/newUpdate', (request, response) => {
  try {
    const data = {name: request.name, 
      date: request.date,
      github_status: request.github_status,
      status: request.status,
      error_status: request.error_status,
      info: request.info
    }
    writeNewsData(date, updateFile)
    response.json({message: true});
  } catch (err) {
    response.json({message: false})
  }
});

module.exports = router;
