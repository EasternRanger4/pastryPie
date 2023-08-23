var Mta = require('mta-gtfs');
const express = require("express");
const router = express.Router();
require('dotenv').config()

var mta = new Mta({
  key: process.env.MTA, // only needed for mta.schedule() method
  feed_id: 1                  // optional, default = 1
});

router.get('/status', (request, response) => {
  mta.status().then(function (result) {
    response.json({result})
  });
});

router.get('/stopPoint', (request, response) => {
  mta.stop().then(function (result) {
    response.json({result})
  }).catch(function (err) {
    response.json({err})
  });
});

module.exports = router;
