"use strict"

var request = require('request');

function requestHotels(refPlace, startDate, endDate) {
  let url =
  `http://terminal2.expedia.com/x/mhotels/search?city=${refPlace}&checkInDate=${startDate}&checkOutDate=${endDate}&room1=2&apikey=${process.env.EXPEDIA_API_KEY}`;

  return promisifyGet(url);
}

function getHotelInfo(hotelId) {
  let url =
  `http://terminal2.expedia.com/x/mhotels/info?hotelId=${hotelId}&apikey=${process.env.EXPEDIA_API_KEY}`;

  return promisifyGet(url);
}

function promisifyGet(url) {
    return new Promise(function(resolve, reject) {
        request.get(url, function(error, response, body){
            if(error) {
                reject(error);
            }
            else {
                resolve(response);
            }
        });
    });
}


module.exports = {
  requestHotels: requestHotels,
  getHotelInfo: getHotelInfo
}
