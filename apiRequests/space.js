const express = require("express");
const fs = require('fs');
const Datastore = require('nedb');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()

router.get('/APOD', async (request, response) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${request.ofset}&limit=${request.limt}`
    const pokemon = await fetch(url);
    const data = await pokemon.json();
    response.json({message: true, content: data});
});

fetchData();


module.exports = router;
