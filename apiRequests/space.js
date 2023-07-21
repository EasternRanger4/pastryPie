const express = require("express");
const fs = require('fs');
const Datastore = require('nedb');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()

router.get('/APOD', async (request, response) => {
    const key = process.env.NASA;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`
    const pokemon = await fetch(url);
    const data = await pokemon.json();
    response.json({message: true, content: data});
});


module.exports = router;
