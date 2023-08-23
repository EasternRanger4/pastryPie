const fetch = require('node-fetch');
const express = require('express');
const fs = require('fs');
const router = express.Router();
require('dotenv').config()

router.get('/codes', async (request, response) => {  
    const url = 'https://iata-and-icao-codes.p.rapidapi.com/airlines';
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.AVCODESONE,
        'X-RapidAPI-Host': 'iata-and-icao-codes.p.rapidapi.com'
    }
    };

    try {
        const responses = await fetch(url, options);
        const result = await responses.json();
        response.json({result, result})
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
