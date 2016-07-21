/*
    Call Google API to get geocode when address is given as input
*/
function initPOICall(){
  var geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder);

  function geocodeAddress(geocoder) {
    var address = document.getElementById('ref-place').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        refLatitude = results[0].geometry.location.lat();
        refLongitude = results[0].geometry.location.lng();
        poiMapCenter = {lat: refLatitude, lng: refLongitude};

        poiApiCall(refLatitude, refLongitude);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

function poiApiCall(latitude, longitude) {
  $.ajax({
    // url:`http://localhost:3000/poi`,
    url: `https://salty-lake-14644.herokuapp.com/`,
    method: "POST",
    data: {latitude: latitude, longitude: longitude},
  })
  .done(function(data) {
    var pointsArr = data.filter(function(point) {
      return point.tags.score.popularity.value >= poiScore;
    }).map(function(point) {
      return new PointOfInterest(point);
    });

    // Sort pointsArr by score
    pointsArr.sort(function (a, b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });

    pointsArr = pointsArr.slice(0, poiNumber);

    pointsArr.forEach(function(point) {
      var refPlace = $('#ref-place').val();
      calculatePOIDistance(refPlace, point);
    });

    // add Map button
    var showMapBtn = $('<button id="showmap-btn">');
    showMapBtn.addClass("btn btn-primary");
    showMapBtn.text("Show Map");
    $("#poi-table").parent().append(showMapBtn);

    showMapBtn.click(function() {
      selectedPOIs = pointsArr.filter(function(point) {
        return point.mapChecked;
      });

      if(selectedPOIs.length === 0) {
        var errMsg = $('<h5 style="color: red">Please select places to show on the map.</h5>');
        $("#poi-table").parent().append(errMsg);
        return;
      };

      buildPOIMap(selectedPOIs);
    });

  })
  .fail(function(error) {
    console.log(error);
    console.log("Error happened!");
  });

}



/*
    Call GoogleMap API to get distance and driving time
*/
function calculatePOIDistance(origin, point) {
  var mapResult = {};
  var destination = point.address;
  var service = new google.maps.DistanceMatrixService;

  var mapInput = {
    origins: [origin],
    destinations: [destination],
    travelMode: google.maps.TravelMode[poiTravelMode],
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  };
  service.getDistanceMatrix(mapInput, cbDistanceResult);
  function cbDistanceResult(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      // var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var distance = response.rows[0].elements[0].distance.text;
      // var duration = response.rows[0].elements[0].duration.text;
      mapResult["name"] = point.name;
      mapResult["destAddress"] = destinationList[0];
      mapResult["distance"] = distance;
      // mapResult["duration"] = duration;

      point.render(mapResult);
    }
  }
}

/*
    Call GoogleMap API to build map with multiple places
*/
function buildPOIMap(places) {
  bounds = new google.maps.LatLngBounds;
  var destinationList = places.map(function(place) {
    return place.address;
  });
  var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  var mapInput = {
    origins: [refPlace],
    destinations: destinationList,
    travelMode: google.maps.TravelMode[poiTravelMode],
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  };
  service.getDistanceMatrix(mapInput, cbBuildMap);
  function cbBuildMap(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      deleteMarkers(poiMarkersArray);

      // create new map
      $('#poi-map').css('display', 'block');
      poiMap = new google.maps.Map(document.getElementById('poi-map'), {
        center: poiMapCenter,
        zoom: 15
      });
      var poiLabel = pMapLabels[pMapLabelIdx++ % pMapLabels.length];
      var refMarker = createPOIMarker(poiMap, poiMapCenter, poiLabel, refPlace.toUpperCase());
      poiMarkersArray.push(refMarker);

      var showGeocodedAddressOnMap = function(asDestination) {
        // var icon = asDestination ? destinationIcon : originIcon;
        return function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            poiMap.fitBounds(bounds.extend(results[0].geometry.location));
            var position = results[0].geometry.location;
            var title = results[0].address_components[0].short_name;
            var marker = createPOIMarker(poiMap, position, pMapLabels[pMapLabelIdx++ % pMapLabels.length], title);
            poiMarkersArray.push(marker);
          } else {
            alert('Geocode was not successful due to: ' + status);
          }
        };
      };

      // Render POI text output
      var mapExp = $('<h4 style = "color: blue">');
      var mapContent = `${pMapLabels[0]} <strong>${refPlace.toUpperCase()}</strong>`;
      mapExp.html(mapContent);
      $('#poi-text').append(mapExp);
      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          geocoder.geocode({'address': destinationList[j]},
              showGeocodedAddressOnMap(true));

          var mapExp = $('<p>');
          var mapContent = `${pMapLabels[j+1]} <strong>${places[j].name}</strong><br>
              Address: ${destinationList[j]}<br>
              Distance: ${results[j].distance.text}<br>Travel Time: ${results[j].duration.text }`;
          mapExp.html(mapContent);
          $('#poi-text').append(mapExp);
        }
      }

      addPlaces();
    }
  }
}

function createPOIMarker(map, position, label, title) {
  var marker = new google.maps.Marker({
    map: map,
    position: position,
    label: label,
    title: title
  });
  google.maps.event.addListener(marker , 'click', function(){
    var infowindow = new google.maps.InfoWindow({
      content:title,
      position: position,
    });
    infowindow.open(map);
  });
  return marker;
}

function deleteMarkers(markersArray) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}
