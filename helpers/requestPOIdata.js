"use strict"

var request = require('request');

function requestPOIdata(latitude, longitude, poiDistance) {
  if(!poiDistance) {
    poiDistance = 10;
  }
  let url = `http://terminal2.expedia.com/x/geo/features?within=${poiDistance}mi&lng=${longitude}&lat=${latitude}&type=point_of_interest&verbose=3&lcid=1033&apikey=${process.env.EXPEDIA_API_KEY}`;

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


module.exports = requestPOIdata;
