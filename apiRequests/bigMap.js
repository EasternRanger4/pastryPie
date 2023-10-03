const fetch = require('node-fetch');
const express = require('express');
const fs = require('fs');
const router = express.Router();
require('dotenv').config()
const tflKey = process.env.TFLB;

async function getVictoriaLine() {
    const url = `https://api.tfl.gov.uk/Line/victoria/Arrivals?app_key=${tflKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const json = {};

    for (const i in data) {
        const toAdd = data[i];
        json[i] = toAdd;
        console.log(toAdd.vehicleId)
    }
}

module.exports = router;
