function searchAddressToGeocode(address) {
  var geocoder = new google.maps.Geocoder();
  var Geocode;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      geocodeToSearch = {lat: latitude, lng: longitude};

      searchNearbyPlaces(geocodeToSearch, searchString);
    } else {
      console.log("Error!");
    };
  });
}

function searchNearbyPlaces(searchGeocode, searchType) {
  var searchCenter = searchGeocode;

  $('#search-map').css('display', 'block');
  searchMap = new google.maps.Map(document.getElementById('search-map'), {
    center: searchCenter,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var searchService = new google.maps.places.PlacesService(searchMap);
  searchService.nearbySearch({
    location: searchCenter,
    radius: 1000,
    type: [searchType]
  }, cbSearchService);

  function cbSearchService(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: searchMap,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    getPlaceDetails(place.place_id);
  });
};

function getPlaceDetails(placeId) {
    var detailService = new google.maps.places.PlacesService(searchMap);
    // var searchBounds = new google.maps.LatLngBounds;

    detailService.getDetails({placeId: placeId}, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place);
        var marker = new google.maps.Marker({
          map: searchMap,
          position: place.geometry.location
        });
        // searchMap.fitBounds(searchBounds.extend(place.geometry.location));
        google.maps.event.addListener(marker, 'click', function() {
          var content;
          if (place.website) {
            var website = place.website.split("?")[0];
            content = '<div>' +
            '<span><strong>' + place.name + '</strong></span><br>' +
            `<span>${place.formatted_address}</span><br>` + `<span>${place.formatted_phone_number}</span><br>` +
            `<span>Rating: ${place.rating}</span><br>` +
            `<a target="_blank" href="${website}">Website</a><br>` +
            '<button type="button" class="btn btn-success" id="iti-add-btn" onclick="addToItinerary(\''+place.name+'\',\''+place.formatted_address+'\')">Add to Itinerary</button>' +
            '</div>';
            console.log(content);
          } else {
            content = '<div>' +
            '<p><strong>' + place.name + '</strong></p>' +
            place.formatted_address + '<br>' + place.formatted_phone_number + '<br>' +
            `<a target="_blank" href="${place.url}">More info</a>` + '<br>' +
            '<button type="button" class="btn btn-success" id="iti-add-btn" onclick="addToItinerary(\''+place.name+'\',\''+place.formatted_address+'\')">Add to Itinerary</button>' +
            '</div>';
          }

          infowindow.setContent(content);
          infowindow.open(searchMap, this);

          searchInfoWindow = infowindow;
        });
      }
  });
}
