"use strict"

let express = require("express");
let router = express.Router();
let requestPOIdata = require("../helpers/requestPOIdata");

router.post('/', function(req, res, next) {
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;

  let poiCall = requestPOIdata(latitude, longitude);

  poiCall
  .then(function(data) {
    let poiData = JSON.parse(data.body);
    res.json(poiData);
  });
});

module.exports = router;
