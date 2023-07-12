const express = require("express");
const fs = require('fs');
const { request } = require("http");
const Datastore = require('nedb');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()

router.get('/fortniteAES', async (request, response) => {
    const apiData = await fetch("https://fortnite-api.com/v2/aes");
    const data = await apiData.json(); 
    response.json({data})
});
router.get('/fortniteBanners', async (request, response) => {
    const apiData = await fetch("https://fortnite-api.com/v1/banners");
    const data = await apiData.json(); 
    response.json({data})
});
router.get('/fortniteCosmetics', async (request, response) => {
    const apiData = await fetch("https://fortnite-api.com/v2/cosmetics/br");
    const data = await apiData.json(); 
    response.json({data})
});
router.get('/newFortniteCosmetics', async (request, response) => {
    const apiData = await fetch("https://fortnite-api.com/v2/cosmetics/br/new");
    const data = await apiData.json(); 
    response.json({data})
});
router.get('/fortniteCreatorCodes', async (request, response) => {
    const apiData = await fetch("https://fortnite-api.com/v2/creatorcode");
    const data = await apiData.json(); 
    response.json({data})
});
router.get('/fortniteNews', async (request, response) => {
    const apiData = await fetch("https://fortnite-api.com/v2/news");
    const data = await apiData.json(); 
    response.json({data})
});
router.get('/fortnitePlaylists', async (request, response) => {
    const apiData = await fetch("https://fortnite-api.com/v1/playlists");
    const data = await apiData.json(); 
    response.json({data})
});
router.get('/fortniteShop', async (request, response) => {
    const apiData = await fetch("https://fortnite-api.com/v2/shop/br");
    const data = await apiData.json(); 
    response.json({data})
});

module.exports = router;
