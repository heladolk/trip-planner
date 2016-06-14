function poiApiCall(latitude, longitude) {
  $.ajax({
    url:
    `http://terminal2.expedia.com/x/geo/features?within=${poiDistance}mi&lng=${longitude}&lat=${latitude}&type=point_of_interest&verbose=3&lcid=1033&apikey=${expediaApiKey}`,
    method: "GET"
  })
  .done(function(data) {
    // console.log("Geosearch Results");
    // console.log(data);
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
