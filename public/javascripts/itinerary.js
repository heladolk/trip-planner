function addToItinerary(name, address) {
  itineraryPlaceList.push(new Place({name: name, address: address, checked: true, method: "search"}));
  searchInfoWindow.close();
  console.log("TEST POINT");
  console.log(itineraryPlaceList);
}

function buildItinerary() {
  var itiSection = $(".iti-section");
  console.log(selectedPOIs);
  // itiSection.empty();

  if (selectedPOIs.length === 0 && itineraryPlaceList.length === 0) {
    itiSection.append("<p>No places are added to Itinerary</p>");
    return;
  }

  if(selectedPOIs.length > 0) {
    $('#poi-panel').css('display', 'block');
    var poiList = $('#poiP-list');
    selectedPOIs.forEach(function(poi) {
      var poiPlace = $('<li class="list-group-item">');
      poiPlace.text(poi.name);
      poiList.append(poiPlace);
    });
  };

  if(itineraryPlaceList.length > 0) {
    var addedPlaceList = itineraryPlaceList.filter(function(place) {
      return place.method === "add";
    });
    var searchedPlaceList = itineraryPlaceList.filter(function(place) {
      return place.method === "search";
    });

    if (addedPlaceList.length > 0) {
      $('#add-panel').css('display', 'block');
      var addList = $('#addP-list');
      addedPlaceList.forEach(function(place) {
        var itiAddPlace = $('<li class="list-group-item">');
        itiAddPlace.text(place.name);
        addList.append(itiAddPlace);
      });
    };

    if (searchedPlaceList.length > 0) {
      $('#search-panel').css('display', 'block');
      var searchList = $('#searchP-list');
      searchedPlaceList.forEach(function(place) {
        var itiSearPlace = $('<li class="list-group-item">');
        itiSearPlace.text(place.name);
        searchList.append(itiSearPlace);
      });
    };

  };
}
