"use strict";

require('dotenv').load();
let express = require('express');
let app = express();
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let poi = require('./routes/api/poi');
let hotel = require('./routes/api/hotel');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

app.use('/api/poi', poi);
app.use('/api/hotel', hotel);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
