var express = require("express");
var app = express();

var morgan = require("morgan");
morgan('combined', {
  skip: function(req, res) {
    return res.statusCode < 400
  }
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/hotel', function(req, res, next) {
  res.sendFile(__dirname + '/views/hotel.html');
});

app.get('/itinerary', function(req, res, next) {
  res.sendFile(__dirname + '/views/itinerary.html');
});

app.get('/searchPlace', function(req, res, next) {
  res.sendFile(__dirname + '/views/searchPlace.html');
});

// const PORT = process.env["PORT"];
PORT = 3000;
app.listen(PORT, function() {
  console.log("Listening to port " + PORT);
})
