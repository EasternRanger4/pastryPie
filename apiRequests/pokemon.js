const express = require("express");
const fs = require('fs');
const { request } = require("http");
const Datastore = require('nedb');
const fortniterouter = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()
const router = express.Router();


router.post('/allPokemon', async (request, response) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${request.ofset}&limit=${request.limt}`
    const pokemon = await fetch(url);
    const data = await pokemon.json();
    response.json({message: true, content: data});
});
module.exports = router;
