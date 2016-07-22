"use strict"

let express = require("express");
let router = express.Router();
let requestHotels = require("../../helpers/requestHoteldata").requestHotels;
let getHotelInfo = require("../../helpers/requestHoteldata").getHotelInfo;

router.post('/', function(req, res, next) {
  let refPlace = req.body.refPlace;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  let hotelCall = requestHotels(refPlace, startDate, endDate)

  hotelCall
  .then(function(data) {
    let hotels = JSON.parse(data.body);
    res.json(hotels);
  });
});

router.get('/:id', function(req, res, next) {
  let hotelId = req.params.id;

  let hotelData = getHotelInfo(hotelId);
  
  hotelData
  .then(function(data) {
    let hotel = JSON.parse(data.body);
    res.json(hotel);
  });
});

module.exports = router;
