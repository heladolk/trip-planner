function addPlaces() {
  var placeInput = $('<input type="text" placeholder="Enter Address or Place name">');
  placeInput.addClass("form-control");
  $("#place-add").append(placeInput);
  var addPlaceButton = $('<button type="button">');
  addPlaceButton.addClass("btn btn-success");
  addPlaceButton.text("Add Place");
  $("#place-add").append(addPlaceButton);
  addPlaceButton.click(function() {
    var newAddress = placeInput.val();
    addPlaceToMap(newAddress);
  });
};

function addPlaceToMap(address) {
  var geocoder = new google.maps.Geocoder();
  var newLabel = pMapLabels[pMapLabelIdx++ % pMapLabels.length];

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log(results[0]);
      var position = results[0].geometry.location;
      var title = results[0].address_components[0].short_name;
      var marker = createPOIMarker(poiMap, position, newLabel, title)
      poiMarkersArray.push(marker);
      poiMap.fitBounds(bounds.extend(results[0].geometry.location));

      var newName = results[0].address_components[0].short_name;
      var newAddress = results[0].formatted_address
      var newPlace = {name: newName, address: newAddress, mapLabel: newLabel};

      getNewPlaceDistance(refPlace, newPlace);

      itineraryPlaceList.push(new Place({name: newName, address: newAddress, checked: true, method: "add"}));

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function getNewPlaceDistance(origin, point) {
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

  service.getDistanceMatrix(mapInput, cbDistance);

  function cbDistance(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var distance = response.rows[0].elements[0].distance.text;
      var duration = response.rows[0].elements[0].duration.text;

      // Render result
      var mapExp = $('<p>');
      var mapContent = `${point.mapLabel} <strong>${point.name}</strong><br>
          Address: ${point.address}<br>
          Distance: ${distance}<br>Travel Time: ${duration}`;
      mapExp.html(mapContent);
      $('#place-add').append(mapExp);

    };
  };
};
