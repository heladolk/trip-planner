/*
  Used in main.js
*/

// API Keys
var expediaApiKey = "FgH7zj5FQzFAN1mYvPoFC9pGnQzTCxEe";
// var googleApiKey = "AIzaSyBCt5usaXtxhpHdPo4Z9P962aq6ACw5JsQ";
var googleApiKey = "AIzaSyAXPB92qlH58ItNsyJkV0JX6VKIAmt47Vg";

// Global variables
var refPlace;
var startDate, endDate;
var refLatitude, refLongitude;
var poiNumber = 15;
var poiScore = 70;
var poiDistance, poiTravelMode;

/*
  Used in poi.js
*/
var poiMap;
var poiMapCenter;
var bounds;
var poiMarkersArray = [];
var pMapLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var pMapLabelIdx = 0;

/*
  Used in poiApiCall.js
*/
var selectedPOIs = [];

/*
  Used in searchPlace.js
*/
var searchMap;
var geocodeToSearch;
var searchString;
var searchInfoWindow;

/*
  Used in itinerary.js
*/
var itineraryPlaceList = [];
